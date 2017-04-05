var SmartBus = require('smart-bus');


module.exports = function(RED) {
    function BusproControllerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port || 6000;
        this.deviceid = parseInt(n.subnetid)+"."+parseInt(n.deviceid);
        var node = this;
		this.bus = new SmartBus({
  			device: node.deviceid,      // Connector address in HDL network (subnet.id)
  			gateway: node.host, 		// HDL SmartBus gateway IP
  			port: node.port                	// and port, default: 6000
		});
		this.on("close",function(){
			node.bus.removeAllListeners();
			node.bus.socket.close();
		})        
    }
    RED.nodes.registerType("buspro-controller",BusproControllerNode);


    function BusproIn(config) {
        RED.nodes.createNode(this,config);
        this.bus = RED.nodes.getNode(config.controller);
        var node = this;
		this.bus.on('command', function(command) {
		  // Integer with command operation code
		  //command.code;
		  // Device objects
		  //command.sender;
		  //command.target;
		  // Object with decoded data or raw buffer
		  // if data can not be parsed automatically
		  //command.data;
		});        
    }
    RED.nodes.registerType("buspro-in",BusproIn);


}

