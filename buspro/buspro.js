var SmartBus = require('smart-bus');
var EventEmitter = require('events').EventEmitter;
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
        this.recivedCommand = function(command){
        	var msg = {};
		  	msg.sender = command.sender.subnet + "." + command.sender.id;
		  	msg.target = command.target.subnet + "." + command.target.id;
		  	msg.code = command.code;
		  	msg.payload = command.data;
            msg.topic = 'command';
		  	node.send(msg);
		};

		this.bus.on('command', node.recivedCommand);

		this.on("close", ()=>{
            this.bus.removeListener('command', node.recivedCommand);
		});
    }
    RED.nodes.registerType("buspro-in",BusproIn);

    function BusproOut(config) {
        RED.nodes.createNode(this,config);
        var controller = RED.nodes.getNode(config.controller);
        this.bus = controller.bus;
        var node = this;
        this.on('input', (msg)=>{
            if (!msg.target || !msg.code){
                node.error("Required parameters msg.target and msg.code");
                return;
            }
            node.bus.send(msg.target, msg.code, msg.payload, function(err) {
                if (err){
                    node.error(err);   
                }
            });
        });
       
        this.on("close", ()=>{

        });
    }
    RED.nodes.registerType("buspro-out",BusproOut);


}

