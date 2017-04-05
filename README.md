# node-red-contrib-buspro
Node-Red implementation of HDL BusPro (SmartBus) protocol http://hdlautomation.com

Based on https://github.com/caligo-mentis/smart-bus.

## BusPro-IN 

<p>Receive commands from BusPro (Smart-Bus) network</p>
<p><b>msg.sender and msg.target</b> - ID of Device</p>
<p><b>msg.code</b> - Integer with command operation code</p>
<p><b>msg.payload</b> - bject with decoded data or raw buffer if data can not be parsed automatically</p>