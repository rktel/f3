import { Syrus } from '../server/gps/dct/syrus_adapter'
import { Server } from './avl/avl-server'
//----------------------CONSTANTES
//#WORDS
TAIP_INIT_MOBILEID = "ID=";
TAIP_PORT = 3001;
TAIP_HOST = '0.0.0.0';
//----------------------VARIABLES
//#SOCKETS
SOCKS_0 = []
SOCKS_1 = [11]
SOCKS_2 = []
SOCKS_3 = []
SOCKS_4 = []
SOCKS_5 = []
SOCKS_6 = []
SOCKS_7 = []
SOCKS_8 = []
SOCKS_9 = []
//----------------------FUNCIONES
function getSOCK(index) {
   if (index === 0) {
       return SOCKS_0
   } else if (index === 1) {
       return SOCKS_1
   } else if (index === 2) {
       return SOCKS_2
   } else if (index === 3) {
       return SOCKS_3
   } else if (index === 4) {
       return SOCKS_4
   } else if (index === 5) {
       return SOCKS_5
   } else if (index === 6) {
       return SOCKS_6
   } else if (index === 7) {
       return SOCKS_7
   } else if (index === 8) {
       return SOCKS_8
   } else if (index === 9) {
       return SOCKS_9
   } else {
       return false
   }
}
Meteor.startup(() => {
   // Meteor.call('devicesReset')
   // Meteor.call('createHyperPersonal')
   // Meteor.call('setEmailOptions')
   new Syrus()
   new Server(TAIP_PORT, TAIP_HOST)
})
