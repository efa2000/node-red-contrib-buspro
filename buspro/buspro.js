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
        var controller = RED.nodes.getNode(config.controller);
        this.bus = controller.bus;
        var node = this;
        this.transmit = function(command){
        	var msg = {};
		  	msg.sender = command.sender.subnet + "." + command.sender.id;
		  	msg.target = command.target.subnet + "." + command.target.id;
		  	msg.code = command.code;
		  	msg.payload = command.data;
		  	node.send(msg);
		};
        // Integer with command operation code
		  //command.code;
		  // Device objects
		  //command.sender;
		  //command.target;
		  // Object with decoded data or raw buffer
		  // if data can not be parsed automatically
		  //command.data;
		this.bus.on('command', node.transmit);

		this.on("close", function(){

		});
    }
    RED.nodes.registerType("buspro-in",BusproIn);


}

