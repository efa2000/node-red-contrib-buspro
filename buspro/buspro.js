var SmartBus = require('smart-bus');
var commandsLink = {
	49: 50
};


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

		this.bus.on('command', node.transmit);

		this.on("close", function(){

		});
    }
    RED.nodes.registerType("buspro-in",BusproIn);

    function BusproDevice(config) {
        RED.nodes.createNode(this,config);
        this.subnetid = parseInt(config.subnetid);
        this.deviceid = parseInt(config.deviceid);
        this.devicetype = config.devicetype;
        console.log(config.devicetype);
        var controller = RED.nodes.getNode(config.controller);
        
        var node = this;
        this.device = controller.bus.device(node.subnetid+"."+node.deviceid);
        this.recived = function(data, target){
        	var msg = {};
		  	msg.sender = node.subnetid+"."+node.deviceid;
		  	msg.target = target.subnet + "." + target.id;
		  	msg.code = commandsLink[node.devicetype];
		  	msg.payload = data;
		  	node.send(msg);
		};

		this.device.on(commandsLink[node.devicetype], node.recived);

		this.on('input', function(msg) {
         	node.device.send(49, msg.payload, function(err){

         	});
     	});

		this.on("close", function(){

		});
    }
    RED.nodes.registerType("buspro-device",BusproDevice);


}

