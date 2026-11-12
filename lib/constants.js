'use strict';

// Zigbee manufacturer code used by Atlantic Group for its manufacturer-specific
// attributes (quiet fan, louver position). The Zigbee2MQTT converter refers to it
// by name only (Zcl.ManufacturerCode.ATLANTIC_GROUP); 4699 (0x125B) is from memory
// and NOT verified. If louver/quiet writes have no effect, check this value first.
module.exports.ATLANTIC_MANUFACTURER_CODE = 4699;
