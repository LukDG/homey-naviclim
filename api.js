'use strict';

module.exports = {
  // GET /status  ->  summary of every Naviclim AC device, used by the settings page
  async getStatus({ homey }) {
    const driver = homey.drivers.getDriver('naviclim-ac');
    return driver.getDevices().map((device) => device.getStatusSummary());
  },
};
