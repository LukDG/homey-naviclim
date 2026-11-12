'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');
require('../../lib/AtlanticThermostatCluster');
require('../../lib/FanControlCluster');
require('../../lib/AtlanticManufacturerCluster');

const ENDPOINT = 1;
const POLL_INTERVAL_MS = 60 * 1000;

// Homey capability value  <->  ZCL value
const MODE_TO_ZCL = {
  off: 'off', auto: 'auto', cool: 'cool', heat: 'heat', dry: 'dry', fan_only: 'fanOnly',
};
const ZCL_TO_MODE = {
  auto: 'auto', cool: 'cool', heat: 'heat', dry: 'dry', fanOnly: 'fan_only',
};
// Fan levels: Auto, 1 (quiet), 2, 3, 4.
// Level 1 = ZCL "low" + the write-only quiet switch; level 2 = plain "low".
const FAN_LEVEL_TO_ZCL = {
  auto: 'auto', 1: 'low', 2: 'low', 3: 'medium', 4: 'high',
};

// Heating and cooling/drying cannot run at the same time on one outdoor unit.
// Auto and fan only are neutral: the interface cannot tell what an auto unit is really doing.
const FAMILY = { heat: 'heat', cool: 'cool', dry: 'cool' };
const familyOf = (mode) => FAMILY[mode] || null;

class NaviclimAcDevice extends ZigBeeDevice {

  async onNodeInit({ zclNode }) {
    this.zclNode = zclNode;
    const endpoint = zclNode.endpoints[ENDPOINT];
    this.thermostat = endpoint.clusters.thermostat;
    this.fan = endpoint.clusters.fanControl;

    this._lastActiveMode = this.getStoreValue('lastActiveMode') || 'auto';
    this._onSince = this.getStoreValue('onSince') || null; // used to decide master/follower in a group

    // Capability added after the first release: make sure existing devices get it.
    if (!this.hasCapability('ac_louver')) await this.addCapability('ac_louver');
    const savedLouver = this.getStoreValue('louver');
    if (savedLouver) this.setCapabilityValue('ac_louver', savedLouver).catch(this.error);

    // --- Homey -> device ---
    this.registerCapabilityListener('onoff', (v) => this._setPower(v));
    this.registerCapabilityListener('ac_mode', (v) => this.setMode(v));
    this.registerCapabilityListener('ac_fan_speed', (v) => this.setFanSpeed(v));
    this.registerCapabilityListener('ac_louver', (v) => this.setLouver(v));
    this.registerCapabilityListener('target_temperature.cooling', (v) => this.thermostat
      .writeAttributes({ occupiedCoolingSetpoint: Math.round(v * 100) }));
    this.registerCapabilityListener('target_temperature.heating', (v) => this.thermostat
      .writeAttributes({ occupiedHeatingSetpoint: Math.round(v * 100) }));

    // --- device -> Homey ---
    this.thermostat.on('attr.localTemperature', (v) => this._onLocalTemperature(v));
    this.thermostat.on('attr.systemMode', (v) => this._onSystemMode(v));
    this.thermostat.on('attr.occupiedCoolingSetpoint', (v) => this._onSetpoint('cooling', v));
    this.thermostat.on('attr.occupiedHeatingSetpoint', (v) => this._onSetpoint('heating', v));
    if (this.fan) {
      this.fan.on('attr.fanMode', (v) => this._onFanMode(v));
    }

    await this._configureReporting();
    await this._refresh();

    // Safety net: the unit may not report changes made with the IR remote.
    this._poll = this.homey.setInterval(() => this._refresh(), POLL_INTERVAL_MS);

    // Best-effort: log what the undocumented manufacturer cluster 0xFC03 offers
    // (louver position / quiet mode are probably in there).
    this._discoverManufacturerCluster(endpoint).catch(this.error);
  }

  onDeleted() {
    if (this._poll) this.homey.clearInterval(this._poll);
  }

  // ---------------------------------------------------------------- setup

  async _configureReporting() {
    const t = CLUSTER.THERMOSTAT;
    try {
      await this.configureAttributeReporting([
        {
          endpointId: ENDPOINT, cluster: t, attributeName: 'localTemperature', minInterval: 30, maxInterval: 900, minChange: 25,
        },
        {
          endpointId: ENDPOINT, cluster: t, attributeName: 'systemMode', minInterval: 0, maxInterval: 3600, minChange: 1,
        },
        {
          endpointId: ENDPOINT, cluster: t, attributeName: 'occupiedCoolingSetpoint', minInterval: 0, maxInterval: 3600, minChange: 25,
        },
        {
          endpointId: ENDPOINT, cluster: t, attributeName: 'occupiedHeatingSetpoint', minInterval: 0, maxInterval: 3600, minChange: 25,
        },
      ]);
    } catch (err) {
      this.error('Could not configure attribute reporting (polling will be used):', err.message);
    }
  }

  async _refresh() {
    const read = async (cluster, attr) => {
      if (!cluster) return;
      try {
        const res = await cluster.readAttributes([attr]);
        if (res && res[attr] !== undefined) cluster.emit(`attr.${attr}`, res[attr]);
      } catch (err) {
        this.error(`Read ${attr} failed:`, err.message);
      }
    };

    await read(this.thermostat, 'localTemperature');
    await read(this.thermostat, 'occupiedCoolingSetpoint');
    await read(this.thermostat, 'occupiedHeatingSetpoint');
    await read(this.thermostat, 'systemMode');
    await read(this.fan, 'fanMode');
  }

  async _discoverManufacturerCluster(endpoint) {
    const c = endpoint.clusters.atlanticManufacturer;
    if (!c) {
      this.log('Cluster 0xFC03 is not exposed on endpoint 1');
      return;
    }
    for (const fn of ['discoverAttributes', 'discoverCommandsReceived', 'discoverCommandsGenerated']) {
      if (typeof c[fn] !== 'function') continue;
      try {
        const res = await c[fn]();
        this.log(`0xFC03 ${fn}:`, JSON.stringify(res));
      } catch (err) {
        this.log(`0xFC03 ${fn} failed:`, err.message);
      }
    }
  }

  // ------------------------------------------------- device -> Homey events

  _onLocalTemperature(raw) {
    this._lastSeen = Date.now();
    if (typeof raw !== 'number' || raw === -0x8000) return;
    this.setCapabilityValue('measure_temperature', raw / 100).catch(this.error);
  }

  _onSetpoint(kind, raw) {
    this._lastSeen = Date.now();
    if (typeof raw !== 'number') return;
    this.setCapabilityValue(`target_temperature.${kind}`, raw / 100).catch(this.error);
  }

  _onSystemMode(zclMode) {
    this._lastSeen = Date.now();
    this.log('systemMode raw:', zclMode);
    if (zclMode === 'off') {
      this._setOn(false, 'off');
      this.setCapabilityValue('onoff', false).catch(this.error);
      this.setCapabilityValue('ac_mode', 'off').catch(this.error);
      return;
    }
    const mode = ZCL_TO_MODE[zclMode];
    if (!mode) return;
    this._setOn(true, mode);

    this._lastActiveMode = mode;
    this.setStoreValue('lastActiveMode', mode).catch(this.error);
    this.setCapabilityValue('onoff', true).catch(this.error);
    this.setCapabilityValue('ac_mode', mode).catch(this.error);
    this._enforceOnPeers(mode);
  }

  _onFanMode(zclFan) {
    this._lastSeen = Date.now();
    this.log('fanMode raw:', zclFan);
    let level;
    switch (zclFan) {
      case 'auto':
      case 'smart':
        level = 'auto';
        break;
      case 'low': {
        // The module reports levels 1 (quiet) and 2 both as "low" and never reports
        // the quiet switch, so keep "1" only if Homey itself selected it.
        level = this.getCapabilityValue('ac_fan_speed') === '1' ? '1' : '2';
        break;
      }
      case 'medium':
        level = '3';
        break;
      case 'high':
      case 'on':
        level = '4';
        break;
      default:
        return;
    }
    this.setCapabilityValue('ac_fan_speed', level).catch(this.error);
  }

  // ------------------------------------------------- Homey -> device actions

  async _setPower(on) {
    let zcl = 'off';
    if (on) {
      const pref = this.getSetting('on_mode');
      const mode = (pref && pref !== 'last') ? pref : this._lastActiveMode;
      this._assertGroupAllows(mode);
      zcl = MODE_TO_ZCL[mode] || 'auto';
    }
    await this.thermostat.writeAttributes({ systemMode: zcl });
    this._onSystemMode(zcl); // update the mode picker immediately
  }

  async setMode(mode) {
    if (!MODE_TO_ZCL[mode]) throw new Error(`Unknown mode: ${mode}`);
    this._assertGroupAllows(mode);
    await this.thermostat.writeAttributes({ systemMode: MODE_TO_ZCL[mode] });
    this._onSystemMode(MODE_TO_ZCL[mode]);
  }

  // ------------------------------------------------------------ outdoor unit groups

  _group() {
    const group = this.getSetting('group');
    return group && group !== 'none' ? group : null;
  }

  // Cache of the real on/off state and mode (capability values are written asynchronously).
  _setOn(on, mode) {
    this._on = on;
    this._mode = mode;
    if (on && !this._onSince) {
      this._onSince = Date.now();
      this.setStoreValue('onSince', this._onSince).catch(this.error);
    } else if (!on && this._onSince) {
      this._onSince = null;
      this.setStoreValue('onSince', null).catch(this.error);
    }
  }

  _isOn() {
    return this._on !== undefined ? this._on : this.getCapabilityValue('onoff') === true;
  }

  _modeNow() {
    return this._mode !== undefined ? this._mode : this.getCapabilityValue('ac_mode');
  }

  _ieee() {
    return (this.getData() || {}).ieeeAddress || '';
  }

  // The units of this group that are on, longest-running first. The first one is the master, the
  // others are followers. When every unit of the group is off, nobody has a role.
  _onMembers() {
    if (!this._group()) return [];
    const since = (d) => d._onSince || Number.MAX_SAFE_INTEGER;
    return [this, ...this._groupPeers()]
      .filter((d) => d._isOn())
      .sort((x, y) => (since(x) - since(y)) || x._ieee().localeCompare(y._ieee()));
  }

  _role() {
    if (!this._group() || !this._isOn()) return 'unknown';
    return this._onMembers()[0] === this ? 'master' : 'follower';
  }

  _isMaster() {
    return this._role() === 'master';
  }

  _family() {
    return this._isOn() ? familyOf(this._modeNow()) : null;
  }

  _groupPeers() {
    const group = this._group();
    if (!group) return [];
    return this.driver.getDevices()
      .filter((d) => d !== this && typeof d._group === 'function' && d._group() === group);
  }

  // A unit that is not the master may not start a mode that conflicts with the master. If the master is
  // in auto or fan only, the unit that is already running heating or cooling decides.
  _assertGroupAllows(mode) {
    const wanted = familyOf(mode);
    if (!wanted || !this._group() || this._isMaster()) return;
    const opposite = wanted === 'heat' ? 'cool' : 'heat';
    const peers = this._groupPeers();
    const blocker = peers.find((p) => p._isMaster() && p._family() === opposite)
      || peers.find((p) => !p._isMaster() && p._family() === opposite);
    if (!blocker) return;
    const reason = this.homey.__(opposite === 'heat' ? 'group.blocked_heat' : 'group.blocked_cool', {
      name: blocker.getName(), group: this._group(),
    });
    const rule = blocker._isMaster()
      ? this.homey.__('group.rule_master', { name: `**${blocker.getName()}**` })
      : this.homey.__('group.rule_first');
    this._notify(`blocked:${mode}`, `**${this.getName()}**: ${reason} ${rule}`, 30 * 1000);
    throw new Error(reason);
  }

  // When the master changes to heating or cooling, followers in the opposite mode always give way
  // (switched off or fan only, as set) and the reason is written to the timeline.
  _enforceOnPeers(mode) {
    const family = familyOf(mode);
    if (!family || !this._group() || !this._isMaster()) return;
    const opposite = family === 'heat' ? 'cool' : 'heat';
    this._groupPeers()
      .filter((p) => !p._isMaster() && p._family() === opposite)
      .forEach((p) => p._yieldToMaster(this.getName(), family));
  }

  _yieldToMaster(masterName, family) {
    const fanOnly = this.getSetting('conflict_action') === 'fan_only';
    const zcl = fanOnly ? 'fanOnly' : 'off';
    this.log(`Group conflict: master "${masterName}" decides, switching this unit to ${zcl}`);
    this.thermostat.writeAttributes({ systemMode: zcl })
      .then(() => {
        this._onSystemMode(zcl);
        this._notify(`yield:${family}:${zcl}`, this.homey.__(`group.yield_${fanOnly ? 'fan' : 'off'}_${family}`, {
          device: `**${this.getName()}**`, master: `**${masterName}**`, group: this._group(),
        }), 0);
      })
      .catch((err) => this.error('Could not yield to the master:', err.message));
  }

  // Writes a message to the Homey timeline (throttleMs 0 = always).
  _notify(key, excerpt, throttleMs) {
    const now = Date.now();
    this._lastNotified = this._lastNotified || {};
    if (this._lastNotified[key] && now - this._lastNotified[key] < throttleMs) return;
    this._lastNotified[key] = now;
    try {
      this.homey.notifications.createNotification({ excerpt })
        .catch((err) => this.error('Could not write to the timeline:', err.message));
    } catch (err) {
      this.error('Could not write to the timeline:', err.message);
    }
  }

  async onSettings({ changedKeys }) {
    if (changedKeys.includes('group')) {
      // The new settings are stored after this method returns; then the master of the group re-checks its followers.
      this.homey.setTimeout(() => {
        const master = this._onMembers()[0];
        if (master) master._enforceOnPeers(master._modeNow());
      }, 1000);
    }
  }

  // Used by the app's settings page (api.js).
  getStatusSummary() {
    const cap = (id) => (this.hasCapability(id) ? this.getCapabilityValue(id) : null);
    const settings = this.getSettings() || {};
    const data = this.getData() || {};
    return {
      name: this.getName(),
      available: this.getAvailable(),
      ieee: data.ieeeAddress || null,
      onoff: cap('onoff'),
      mode: cap('ac_mode'),
      fanSpeed: cap('ac_fan_speed'),
      louver: cap('ac_louver'),
      targetCooling: cap('target_temperature.cooling'),
      targetHeating: cap('target_temperature.heating'),
      temperature: cap('measure_temperature'),
      onMode: settings.on_mode || null,
      lastActiveMode: this._lastActiveMode || null,
      lastSeen: this._lastSeen || null,
      group: settings.group && settings.group !== 'none' ? settings.group : null,
      role: this._group() ? this._role() : null,
    };
  }

  // Used by the flow cards. Limits are the unit's own: cooling 18-30 C, heating 16-30 C, in 0.5 steps.
  async setTargetTemperature(kind, value) {
    const heating = kind === 'heating';
    const temperature = Number(value);
    if (!Number.isFinite(temperature)) throw new Error('Invalid temperature');

    const limited = Math.min(30, Math.max(heating ? 16 : 18, temperature));
    const rounded = Math.round(limited * 2) / 2;
    if (rounded !== temperature) this.log(`Target ${kind} ${temperature} adjusted to ${rounded}`);

    await this.thermostat.writeAttributes({
      [heating ? 'occupiedHeatingSetpoint' : 'occupiedCoolingSetpoint']: Math.round(rounded * 100),
    });
    await this.setCapabilityValue(`target_temperature.${kind}`, rounded);
  }

  async setFanSpeed(speed) {
    if (!this.fan) throw new Error('Fan control is not available on this device');
    const zcl = FAN_LEVEL_TO_ZCL[speed];
    if (!zcl) throw new Error(`Unknown fan speed: ${speed}`);

    if (speed === '1') {
      // Quiet: low fan + quiet switch on.
      await this.fan.writeAttributes({ fanMode: 'low' });
      this.log('Writing quietFan = true');
      await this.fan.writeAttributes({ quietFan: true });
    } else {
      // Any other level: make sure quiet is off first (it cannot be read back).
      try {
        this.log('Writing quietFan = false');
        await this.fan.writeAttributes({ quietFan: false });
      } catch (err) {
        this.error('Could not switch quiet fan off:', err.message);
      }
      await this.fan.writeAttributes({ fanMode: zcl });
    }
  }

  async setLouver(position) {
    const known = this.thermostat.constructor.ATTRIBUTES;
    if (!known || !known.acLouverPosition) {
      throw new Error('Louver control is not available (thermostat cluster not extended)');
    }
    this.log('Writing acLouverPosition =', position);
    await this.thermostat.writeAttributes({ acLouverPosition: position });
    // The module cannot report the louver position, so remember what we set.
    await this.setStoreValue('louver', position);
    await this.setCapabilityValue('ac_louver', position);
  }

}

module.exports = NaviclimAcDevice;
