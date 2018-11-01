# node-red-contrib-buspro
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

### Outgoing message
```js
msg:{
  sender: "1.2" //ID of Sender Device
  target: "255.255" //ID of Target Device
  code: 50    //Integer with command operation code
  payload: {}   //Object with decoded data or raw buffer if data can not be parsed automatically
}
```
You can filter incoming message:
 - All messages
 - Broadcast only
 - FROM specific device
 - TO specific device

## BusPro-OUT 
Send commands to BusPro (Smart-Bus) network

### Message for send to bus
```js
msg:{
  target: "1.52" //ID of Target Device
  code: 49    //Integer with command operation code
  payload: { //Object with data or raw buffer 
  		channel: 2,
  		level: 100
  	}   
}
```
