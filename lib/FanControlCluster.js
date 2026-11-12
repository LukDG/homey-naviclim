'use strict';

// Standard ZCL Fan Control cluster (0x0202), registered here in case the
// installed zigbee-clusters version does not ship it.
const { Cluster, ZCLDataTypes } = require('zigbee-clusters');
const { ATLANTIC_MANUFACTURER_CODE } = require('./constants');

class FanControlCluster extends Cluster {

  static get ID() {
    return 514;
  }

  static get NAME() {
    return 'fanControl';
  }

  static get ATTRIBUTES() {
    return {
      fanMode: {
        id: 0,
        type: ZCLDataTypes.enum8({
          off: 0, low: 1, medium: 2, high: 3, on: 4, auto: 5, smart: 6,
        }),
      },
      // Atlantic/Naviclim: write-only "quiet" fan switch (attribute 0x1000, boolean,
      // manufacturer specific). The module never reports it back.
      quietFan: {
        id: 0x1000,
        type: ZCLDataTypes.bool,
        manufacturerId: ATLANTIC_MANUFACTURER_CODE,
      },
      fanModeSequence: {
        id: 1,
        type: ZCLDataTypes.enum8({
          lowMedHigh: 0, lowHigh: 1, lowMedHighAuto: 2, lowHighAuto: 3, onAuto: 4,
        }),
      },
    };
  }

  static get COMMANDS() {
    return {};
  }

}

Cluster.addCluster(FanControlCluster);

module.exports = FanControlCluster;
