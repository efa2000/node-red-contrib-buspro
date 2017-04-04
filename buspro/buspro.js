var SmartBus = require('smart-bus');


module.exports = function(RED) {
    function BusproControllerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
        this.subnetid = n.subnetid;
        this.deviceid = n.deviceid;
    }
    RED.nodes.registerType("buspro-controller",BusproControllerNode);


    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case",LowerCaseNode);


}

