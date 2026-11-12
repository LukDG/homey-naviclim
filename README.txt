Control your Atlantic or Fujitsu General air conditioner from Homey over Zigbee, without any cloud account.

This app supports the Atlantic Naviclim Zigbee interface (Zigbee model "Adapter Zigbee FUJITSU"), the plug-in module for Atlantic and Fujitsu General split units. Each air conditioner needs its own interface.

What you can do
- Switch the air conditioner on and off
- Choose the mode: auto, cool, heat, dry or fan only
- Set separate cooling and heating target temperatures
- See the current temperature
- Set the fan speed: auto and levels 1 to 4 (level 1 is the quiet mode)
- Set the louver position: quarter, half, three-quarters or fully open
- Use everything in your Flows
- Choose which mode the air conditioner starts in when you switch it on
- Open the app settings for an overview of all your air conditioners
- Group air conditioners that share an outdoor unit; the first unit that is on is the master and decides whether heating or cooling is allowed

Adding a device
Make sure the Naviclim interface is not paired with another hub. If it is, remove it there and reset the interface first. Then go to Devices in the Homey app, add a device, choose Naviclim and put the interface in pairing mode as described in its installation manual. Keep the front panel of the indoor unit open until pairing has finished.

Good to know
- The interface cannot report the louver position or the quiet fan setting. Homey shows the last value it set itself. If you change these with the remote control, Homey does not notice.
- Levels 1 and 2 of the fan speed look the same to the interface. Homey remembers which one you picked.
- Setting a mode from Homey also switches the air conditioner on.
- The mode rule for groups only applies to heating versus cooling or drying. Auto and fan only are not restricted, because the interface cannot tell what an auto-mode unit is actually doing.

This app is not made by or affiliated with Atlantic or Fujitsu General. Product names are used only to describe compatible devices.
