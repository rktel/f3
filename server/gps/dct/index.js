var gps = require("gps-tracking");

var options = {
    'debug'                 : true,
    'port'                  : 7100,
    'device_adapter'        : require("./syrus_adapter")
}

var server = gps.server(options,function(device,connection){
    connection.on("data",function(res){
        //When raw data comes from the device
        console.log(res);
	});

    device.on("login_request",function(device_id,msg_parts){

        // Some devices sends a login request before transmitting their position
        // Do some stuff before authenticate the device... 
        
        // Accept the login request. You can set false to reject the device.
        this.login_authorized(true); 

    });


    //PING -> When the gps sends their position  
    device.on("ping",function(data){

        //After the ping is received, but before the data is saved
        console.log(data);
        return data;

    });

});