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
    // on Connection client - server
    svr.on('connection', (sock) => {
        //on sock  data
        sock.on('data', (data) => {
            // show data  packet
            console.log(data.toString().trim());
            // Check if pdu exist
            const pdu = new Parser(data.toString());

            if (pdu) {
                const mobileID = pdu.mobileID;
                const sockIndex = pdu.sockIndex;
                const SOCK_MASTER = getSOCK(sockIndex);

                // mobileID exist on SOCK_MASTER! 
                if (SOCK_MASTER && SOCK_MASTER.find(element => element.mobileID === mobileID)) {
                    const elementIndex = SOCK_MASTER.findIndex(element => element.mobileID == mobileID);
                    sock.mobileID = mobileID;
                    SOCK_MASTER[elementIndex] = sock;
                    console.log('exit SOCK_MASTER:', SOCK_MASTER.length);
                }
                // mobileID No exist on SOCK_MASTER! 
                if (SOCK_MASTER && !SOCK_MASTER.find(element => element.mobileID === mobileID)) {
                    sock.mobileID = mobileID;
                    SOCK_MASTER.push(sock);
                    console.log('NO exist SOCK_MASTER:', SOCK_MASTER.length);
                }
                // Send ACK to device
                sock.write(mobileID);
            }

        });
        // on sock close
        sock.on('close', function () {
            console.log('connection from %s closed', sock.mobileID);
            const mobileID = sock.mobileID;
            const sockIndex = mobileID[mobileID.length -1];
            const SOCK_MASTER = getSOCK(sockIndex);
            const elementIndex = SOCK_MASTER.findIndex(element => element.mobileID == mobileID);
            delete SOCK_MASTER[elementIndex];
        });
        //on sockt error
        sock.on('error', function (err) {
            console.log('Connection %s error', sock.mobileID);
        });

    });
    // on error server
    svr.on('error', (e) => {
        setTimeout(() => {
            svr.close();
            svr.listen(port, host);
        }, 1000);
    });
    // on close server
    svr.on('close', () => {
        console.log('onCLose server TCP');
        cleanSOCKS();
    })
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

function getSOCK(index) {
    if (index == 0) {
        return SOCKS_0
    } else if (index == 1) {
        return SOCKS_1
    } else if (index == 2) {
        return SOCKS_2
    } else if (index == 3) {
        return SOCKS_3
    } else if (index == 4) {
        return SOCKS_4
    } else if (index == 5) {
        return SOCKS_5
    } else if (index == 6) {
        return SOCKS_6
    } else if (index == 7) {
        return SOCKS_7
    } else if (index == 8) {
        return SOCKS_8
    } else if (index == 9) {
        return SOCKS_9
    } else {
        return false
    }
}
function cleanSOCKS() {
    SOCKS_0 = [];
    SOCKS_1 = [];
    SOCKS_2 = [];
    SOCKS_3 = [];
    SOCKS_4 = [];
    SOCKS_5 = [];
    SOCKS_6 = [];
    SOCKS_7 = [];
    SOCKS_8 = [];
    SOCKS_9 = [];
};