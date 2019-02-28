exports.protocol = 'TAIP'
exports.model_name = 'SYRUS'
exports.compatible_hardware = ['SYRUS/supplier']

const adapter = function (device) {
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
            "device_id": data.substr(data.indexOf('ID=') + 3, 15),//mandatory
            "cmd": data.substr(cmd_start, 3), //mandatory
            "data": data.substring(cmd_start + 3, data.length - 1),
        };
		switch(parts.cmd){
			case "REV":
				parts.action="login_request";	
				break;
			case "BR00":
				parts.action="ping";
				break;
			case "BO01":
				parts.action="alarm";
				break;
			default:
				parts.action="other";
		}
        return parts;
    }
}
exports.adapter = adapter;