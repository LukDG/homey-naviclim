# Naviclim AC (Homey)

Homey app (SDK v3) for a General AC with a Naviclim Zigbee interface.

## Run it
    npm i -g homey
    homey login
    npm install
    homey app run        # test live on your Homey
    homey app install    # keep it installed

## Pairing
The driver matches manufacturer `ATLANTIC GROUP` / model `Adapter Zigbee FUJITSU`
(endpoint 1: clusters 0, 3, 513, 514, 64515). A module that is already paired
through another driver must be removed from Homey, reset, and paired again via
this app. Run with `homey app run` and watch the log: it prints which
attributes the manufacturer cluster 0xFC03 offers (louver / quiet mode).

Capabilities: on/off, mode (auto/cool/heat/dry/fan only), cooling and heating
target temperature, current temperature, fan speed. Flow actions: "Set mode", "Set fan speed".

## Settings page
Open the app's settings in Homey (Apps -> Naviclim AC -> Configure) for a live overview of every
AC: power, mode, targets, temperature, fan speed, louver, last report and Zigbee address.

## Versioning
See VERSIONING.md. Short version: `node scripts/set-version.js "Changelog" "Changelog NL"` then `homey app publish`.
