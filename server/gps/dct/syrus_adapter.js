exports.protocol = 'TAIP'
exports.model_name = 'SYRUS'
exports.compatible_hardware = ['SYRUS/supplier']

let adapter = function (device) {
    if (!(this instanceof adapter)) return new adapter(device);

    this.format = { "start": ">", "end": "<", "separator": ";" }
    this.device = device;

	/*******************************************
	PARSE THE INCOMING STRING FROM THE DEVICE
	You must return an object with a least: device_id, cmd and type.
	return device_id: The device_id
	return cmd: command from the device.
	return type: login_request, ping, etc. 
	*******************************************/
    this.parse_data = function (data) {
        data = data.toString();
        var cmd_start = data.indexOf("REV"); //al the incomming messages has a cmd starting with 'B'
        if (cmd_start > 1) throw "Device is not authorized";
        var parts = {
            "start": data.substr(0, 1),
            "device_id": data.substr(data.indexOf('ID=') + 3, 15),//mandatory
            "cmd": data.substr(cmd_start, 3), //mandatory
            "data": data.substring(cmd_start + 3, data.length - 1),
            "finish": data.substr(data.length - 1, 1)
        };
        switch (parts.cmd) {
            case "RVR":
                parts.action = "firmware_version";
                break;
            case "REV":
                parts.action = "ping";
                break;
            case "BO01":
                parts.action = "alarm";
                break;
            default:
                parts.action = "other";
        }

        return parts;
    }
	this.authorize =function(){
		this.send_comand("AP05");
	}
	this.request_login_to_device = function(){
		//@TODO: Implement this.	
	}
	this.receive_alarm = function(msg_parts){
		//@TODO: implement this
		
		//gps_data = msg_parts.data.substr(1);
		alarm_code = msg_parts.data.substr(0,1);
		alarm = false;
		switch(alarm_code.toString()){
			case "0":
				alarm = {"code":"power_off","msg":"Vehicle Power Off"};
				break;
			case "1":
				alarm = {"code":"accident","msg":"The vehicle suffers an acciden"};
				break;
			case "2":
				alarm = {"code":"sos","msg":"Driver sends a S.O.S."};
				break;
			case "3":
				alarm = {"code":"alarming","msg":"The alarm of the vehicle is activated"};
				break;
			case "4":
				alarm = {"code":"low_speed","msg":"Vehicle is below the min speed setted"};
				break;
			case "5":
				alarm = {"code":"overspeed","msg":"Vehicle is over the max speed setted"};
				break;
			case "6":
				alarm = {"code":"gep_fence","msg":"Out of geo fence"};
				break;
		}
		this.send_comand("AS01",alarm_code.toString());
		return alarm
	}
	
	
	this.get_ping_data = function(msg_parts){
		var str = msg_parts.data;
		var data = {
			"date"			: str.substr(0,6),
			"availability"	: str.substr(6,1),
			"latitude"		: functions.minute_to_decimal(parseFloat(str.substr(7,9)),str.substr(16,1)),
			"longitude"	: functions.minute_to_decimal(parseFloat(str.substr(17,9)),str.substr(27,1)),
			"speed"			: parseFloat(str.substr(28,5)),
			"time"			: str.substr(33,6),
			"orientation"	: str.substr(39,6),
			"io_state"		: str.substr(45,8),
			"mile_post"	: str.substr(53,1),
			"mile_data"	: parseInt(str.substr(54,8),16)
		};
		var datetime = "20"+data.date.substr(0,2)+"/"+data.date.substr(2,2)+"/"+data.date.substr(4,2);
		datetime += " "+data.time.substr(0,2)+":"+data.time.substr(2,2)+":"+data.time.substr(4,2)
		data.datetime=new Date(datetime);
		res = {
			latitude		: data.latitude,
			longitude		: data.longitude,
			time			: new Date(data.date+" "+data.time),
			speed			: data.speed,
			orientation	: data.orientation,
			mileage			: data.mile_data
		}
		return res;	
	}
	
	/* SET REFRESH TIME */
	this.set_refresh_time = function(interval,duration){
		//XXXXYYZZ
		//XXXX Hex interval for each message in seconds
		//YYZZ Total time for feedback
		//YY Hex hours
		//ZZ Hex minutes
		var hours = parseInt(duration/3600);
		var minutes = parseInt((duration-hours*3600)/60);
		var time = f.str_pad(interval.toString(16),4,'0')+ f.str_pad(hours.toString(16),2,'0')+ f.str_pad(minutes.toString(16),2,'0')
		this.send_comand("AR00",time);
	}
	
	/* INTERNAL FUNCTIONS */
	
	this.send_comand = function(cmd,data){
		var msg = [this.device.uid,cmd,data];
		this.device.send(this.format_data(msg));
	}
	this.format_data = function(params){
		/* FORMAT THE DATA TO BE SENT */
		var str = this.format.start;
		if(typeof(params) == "string"){
			str+=params
		}else if(params instanceof Array){
			str += params.join(this.format.separator);
		}else{
			throw "The parameters to send to the device has to be a string or an array";
		}
		str+= this.format.end;
		return str;	
	}
}
exports.adapter = adapter;