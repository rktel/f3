import { Syrus } from '../server/gps/dct/syrus_adapter'
import { Server } from './avl/avl-server'
//----------------------CONSTANTES
//#WORDS
APP_VERSION = "4.0";
TAIP_INIT_MOBILEID = "ID=";
TAIP_PORT = 3001;
TAIP_HOST = '0.0.0.0';
TAIP_PROTOCOL = 'TAIP';
TAIP_PROTOCOL_HB = 'TAIP_HEARTBEAT';
//----------------------VARIABLES
//#SOCKETS
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
//----------------------FUNCIONES

Meteor.startup(() => {
   // Meteor.call('devicesReset')
   // Meteor.call('createHyperPersonal')
   // Meteor.call('setEmailOptions')
   new Syrus();
   new Server(TAIP_PORT, TAIP_HOST);
})
