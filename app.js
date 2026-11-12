'use strict';

const Homey = require('homey');

class NaviclimApp extends Homey.App {

  async onInit() {
    this.homey.flow
      .getActionCard('set-ac-mode')
      .registerRunListener(async ({ device, mode }) => device.setMode(mode));

    this.homey.flow
      .getActionCard('set-ac-fan-speed')
      .registerRunListener(async ({ device, speed }) => device.setFanSpeed(speed));

    this.homey.flow
      .getActionCard('set-ac-louver')
      .registerRunListener(async ({ device, position }) => device.setLouver(position));


    this.homey.flow
      .getActionCard('set-ac-target-cooling')
      .registerRunListener(async ({ device, temperature }) => device.setTargetTemperature('cooling', temperature));

    this.homey.flow
      .getActionCard('set-ac-target-heating')
      .registerRunListener(async ({ device, temperature }) => device.setTargetTemperature('heating', temperature));

    this.log('Naviclim AC app started');
  }

}

module.exports = NaviclimApp;
