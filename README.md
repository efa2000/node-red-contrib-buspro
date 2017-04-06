# node-red-contrib-buspro
Node-Red implementation of HDL BusPro (SmartBus) protocol http://hdlautomation.com

Based on https://github.com/caligo-mentis/smart-bus.
Receive commands from BusPro (Smart-Bus) network
## BusPro-IN 
### Config
### Outgoing message
```js
msg:{
  sender: "1.2" //ID of Sender Device
  target: "255.255" //ID of Target Device
  code: 50    //Integer with command operation code
  payload: {}   //Object with decoded data or raw buffer if data can not be parsed automatically
}
```
