import { Report } from '../../imports/api/collections';

Meteor.methods({
    insertReport: function (data) {
        Report.insert(data)
    },
    writeSingle: function(mobileID, cmd){
        const sockIndex = mobileID[mobileID.length - 1];
        const SOCK_MASTER = getSOCK(sockIndex);
        const sock = SOCK_MASTER.find(element => { if (element) { return element.mobileID === mobileID } });
        if(sock){
            sock.write(cmd);
        }
    },
    writeBroadcast: function (arrayMobileID, cmd) {
        arrayMobileID.forEach(mobileID => {
            Meteor.call('writeSingle',mobileID, cmd)
        });
    }
});

//help functions
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