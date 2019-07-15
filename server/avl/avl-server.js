// TCP module
const net = require('net');
// Parser
import { Parser } from './avl-parser'

export function Server(port, host) {
    const svr = net.createServer();
    //Start tcp server
    svr.listen(port, host, () => {
        console.log('TCP Server is running on port ' + port + '.');
        setInterval(ls=>{
            console.log(`Conexiones en SOCKS_0: ${SOCKS_0.length}`);
            console.log(`Conexiones en SOCKS_1: ${SOCKS_1.length}`);
            console.log(`Conexiones en SOCKS_2: ${SOCKS_2.length}`);
            console.log(`Conexiones en SOCKS_3: ${SOCKS_3.length}`);
            console.log(`Conexiones en SOCKS_4: ${SOCKS_4.length}`);
            console.log(`Conexiones en SOCKS_5: ${SOCKS_5.length}`);
            console.log(`Conexiones en SOCKS_6: ${SOCKS_6.length}`);
            console.log(`Conexiones en SOCKS_7: ${SOCKS_7.length}`);
            console.log(`Conexiones en SOCKS_8: ${SOCKS_8.length}`);
            console.log(`Conexiones en SOCKS_9: ${SOCKS_9.length}`);
        }, 60*1000);
    });
    // on Connection client - server
    svr.on('connection',Meteor.bindEnvironment( (sock) => {
        //on sock  data
        sock.on('data',Meteor.bindEnvironment((data) => {
            // show data  packet
            console.log(data.toString().trim());
            // Check if pdu exist
            const pdu = new Parser(data.toString());

            if (pdu) {
                const mobileID = pdu.mobileID;
                const sockIndex = pdu.sockIndex;
                const SOCK_MASTER = getSOCK(sockIndex);

                // mobileID exist on SOCK_MASTER! 
                if (SOCK_MASTER && SOCK_MASTER.find(element => { if (element) { return element.mobileID === mobileID } })) {
                    const elementIndex = SOCK_MASTER.findIndex(element => { if (element) { return element.mobileID === mobileID } });
                    if (elementIndex >= 0) {
                        sock.mobileID = mobileID;
                        SOCK_MASTER[elementIndex] = sock;
                    }
                }
                // mobileID No exist on SOCK_MASTER! 
                if (SOCK_MASTER && !SOCK_MASTER.find(element => { if (element) { return element.mobileID === mobileID } })) {
                    sock.mobileID = mobileID;
                    SOCK_MASTER.push(sock);
                }
                // Send ACK to device
                sock.write(mobileID);
            }

        }));
        // on sock close
        sock.on('close', function () {
            console.log('Closed sock', sock.mobileID);
            const mobileID = sock.mobileID;
            const sockIndex = mobileID[mobileID.length - 1];
            const SOCK_MASTER = getSOCK(sockIndex);
            const elementIndex = SOCK_MASTER.findIndex(element => element.mobileID == mobileID);
            SOCK_MASTER.splice(elementIndex, 1);
        });
        //on sockt error
        sock.on('error', function (err) {
            console.log('Error sock', sock.mobileID);
        });

    }));
    // on error server
    svr.on('error', (e) => {
        setTimeout(() => {
            svr.close();
            svr.listen(port, host);
        }, 1000);
    });
    // on close server
    svr.on('close', () => {
        console.log('onClose server TCP');
        cleanSOCKS();
    })
}

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