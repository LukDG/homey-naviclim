'use strict';

// Manufacturer-specific cluster 0xFC03 (64515) exposed on endpoint 1 of the
// Naviclim/Atlantic "Adapter Zigbee FUJITSU". Its attributes are not documented,
// so this is an empty shell used only to discover them (see device.js).
const { Cluster } = require('zigbee-clusters');

class AtlanticManufacturerCluster extends Cluster {

  static get ID() {
    return 64515;
  }

  static get NAME() {
    return 'atlanticManufacturer';
  }

  static get ATTRIBUTES() {
    return {};
  }

  static get COMMANDS() {
    return {};
  }

}

Cluster.addCluster(AtlanticManufacturerCluster);

module.exports = AtlanticManufacturerCluster;
