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

    //PING -> When the gps sends their position  
    device.on("ping",function(data){

        //After the ping is received, but before the data is saved
        console.log(data);
        return data;

    });

});