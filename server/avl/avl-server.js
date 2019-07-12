// TCP module
const net = require('net');
// Parser
import { Parser } from './avl-parser'

let sockets = [];

export function Server(port, host){
    const svr = net.createServer();
    svr.listen(port, host, () => {
        console.log('TCP Server is running on port ' + port + '.');
    });
    svr.on('connection', function (sock) {
        const { remoteAddress, remotePort} = sock
        sockets.push(sock);
        console.log("SOCKS_5:", SOCKS_5)
        sock.on('data', function (data) {
            console.log('DATA ' + sock.remoteAddress + ': ' + data);
            // Write the data back to all the connected, the client will receive it as data from the server
            sockets.forEach(function (sock, index, array) {
                //sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
                //data = data.toString()
                //const mobileID = data.substring(data.indexOf(SYRUS_INIT_MOBILEID) + 3, data.indexOf(SYRUS_END_MOBILEID))
                // console.log("mobileID:", mobileID);
                const pdu = new Parser(data.toString().trim())
                console.log("pdu.mobileID:",pdu.mobileID);
                
                sock.write(pdu.mobileID)
            });
        });
    
        // Add a 'close' event handler to this instance of socket
        sock.on('close', function (data) {
            let index = sockets.findIndex(function (o) {
                return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
            })
            if (index !== -1) sockets.splice(index, 1);
            console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
        });
    }); 
}