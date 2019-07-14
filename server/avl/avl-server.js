// TCP module
const net = require('net');
// Parser
import { Parser } from './avl-parser'

export function Server(port, host) {
    const svr = net.createServer();
    //Start tcp server
    svr.listen(port, host, () => {
        console.log('TCP Server is running on port ' + port + '.');
    });
    // on Connection
    svr.on('connection', function (sock) {

        sock.on('data', function (data) {
            // show data  packet
            console.log(data.toString().trim());
            // Check if pdu exist
            const pdu = new Parser(data.toString());

            if (pdu) {
                const mobileID = pdu.mobileID;
                const sockIndex = pdu.sockIndex;
                const SOCK = getSOCK(sockIndex);
                console.log(SOCK);
                sock.write(mobileID);
            }

        });

    });
}

/*
// Add a 'close' event handler to this instance of socket
                sock.on('close', function (data) {
                    let index = sockets.findIndex(function (o) {
                        return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
                    })
                    if (index !== -1) sockets.splice(index, 1);
                    console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
                });
*/