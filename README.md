# node-red-contrib-buspro
Node-Red implementation of HDL BusPro (SmartBus) protocol http://hdlautomation.com

Based on https://github.com/caligo-mentis/smart-bus.
## BusPro-Controller
node that holds connection to IP Gateway of BusPro (Smart-Bus) network
### Config
```js
defaults: {
            host: {value:"",required:true},   // HDL SmartBus gateway IP 
            port: {value:6000,required:true,validate:RED.validators.number()},    // and port, default: 6000 
            subnetid: {value: 1, required: true, validate: RED.validators.number()}, // Connector address in HDL network (Subnet ID)
            deviceid: {value: 99, required: true, validate: RED.validators.number()} // Connector address in HDL network (Device ID)
        }
```
## BusPro-IN 
Receive commands from BusPro (Smart-Bus) network
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
