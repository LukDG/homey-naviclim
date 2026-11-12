'use strict';

// Thermostat cluster (0x0201) extended with the Atlantic/Naviclim louver position
// attribute. Attribute id 17011 (0x4273), enum8, manufacturer specific.
// Source: Zigbee2MQTT converter for "Adapter Zigbee FUJITSU" (zigbee-herdsman-converters).
const { Cluster, ThermostatCluster, ZCLDataTypes } = require('zigbee-clusters');
const { ATLANTIC_MANUFACTURER_CODE } = require('./constants');

class AtlanticThermostatCluster extends ThermostatCluster {

  static get ATTRIBUTES() {
    return {
      ...super.ATTRIBUTES,
      acLouverPosition: {
        id: 17011,
        type: ZCLDataTypes.enum8({
          quarter_open: 1, half_open: 2, three_quarters_open: 3, fully_open: 4,
        }),
        manufacturerId: ATLANTIC_MANUFACTURER_CODE,
      },
    };
  }

}

Cluster.addCluster(AtlanticThermostatCluster);

module.exports = AtlanticThermostatCluster;
