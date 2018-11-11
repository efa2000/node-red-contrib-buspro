# node-red-contrib-buspro
[![npm version](https://badge.fury.io/js/node-red-contrib-buspro.svg)](https://badge.fury.io/js/node-red-contrib-buspro)
[![dependencies Status](https://david-dm.org/efa2000/node-red-contrib-buspro/status.svg)](https://david-dm.org/efa2000/node-red-contrib-buspro)

Node-Red implementation of HDL BusPro (SmartBus) protocol http://hdlautomation.com

Based on https://github.com/caligo-mentis/smart-bus.

## BusPro-Controller
node that holds connection to IP Gateway of BusPro (Smart-Bus) network

### Config
```js
defaults: {
            host: {value:"",required:true},   // HDL BusPro  IP gateway 
            port: {value:6000, required:true, validate:RED.validators.number()},    // and port, default: 6000 
            subnetid: {value: 1, required: true, validate: RED.validators.number()}, // Connector address in HDL network (Subnet ID)
            deviceid: {value: 99, required: true, validate: RED.validators.number()} // Connector address in HDL network (Device ID)
        }
```

## BusPro-IN 
Receive commands from BusPro (Smart-Bus) network

### Message format 
```js
msg:{
  sender: "1.2", //ID of Sender Device
  target: "255.255", //ID of Target Device
  code: 50,    //Integer with command operation code
  payload: {},   //Object with decoded data or raw buffer if data can not be parsed automatically
  topic: 'buspro/1.2/255.255/50' // topic contains a brief selection of parameters "buspro/{sender}/{target}/{command code}
}
```
### Incoming messages can be filtered:
 - All messages
 - Broadcast only
 - FROM specific device
 - TO specific device
 
### You can also use the filter by integer command code.


## BusPro-OUT 
Send commands to BusPro (Smart-Bus) network

### Message for send to bus
```js
msg:{
  target: "1.52", //Target device address
  code: 49,    //Integer with command operation code
  sender: "1.99", // (Optional) Source device address. A message will be sent from this device address. If the sender is not presented, it will be sent from the controller address
  payload: { //Object with data or raw buffer 
  		channel: 2,
  		level: 100
  	}   
}
```
