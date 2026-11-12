'use strict';

const { ZigBeeDriver } = require('homey-zigbeedriver');

class NaviclimAcDriver extends ZigBeeDriver {

  async onInit() {
    await super.onInit();
    this.log('Naviclim AC driver initialised');
  }

}

module.exports = NaviclimAcDriver;
