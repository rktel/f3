import { Time, Latitude, Longitude, Speed } from './syrus_convert'

const APP_VERSION = Meteor.settings.public.appVersion
const SYRUS_PROTOCOL = Meteor.settings.public.syrusProtocol

export default class SyrusParser {
    constructor(message) {

        if (message.includes('REV')) {
            this._deviceID = message.substring(message.lastIndexOf('ID=') + 3, message.lastIndexOf('<'))
            this._eventCode = parseInt(message.substr(4, 2))
            this._created = Time(message.substr(6, 10))
            this._received = (new Date()).toISOString()
            this._latitude = Latitude(message.substr(16, 8))
            this._longitude = Longitude(message.substr(24, 9))
            this._speed = Speed(message.substr(33, 3))
            this._course = parseInt(message.substr(36, 3))
            this._rawData = message
            Meteor.call('insertEvent', this.event())
        }
        if (message.includes('RXART')) {
            this._received = (new Date()).toISOString()
            this._deviceID = message.substring(message.lastIndexOf('ID=') + 3, message.lastIndexOf('<'))
            const splitMessage = message.split(';')
            this._firmware = splitMessage[1]
            this._hardware = splitMessage[2]
            this._cell = splitMessage[4]
            this._rawData = message
            Meteor.call('upsertInfo', this.info())
        }

    }
    event() {
        return {
            appVersion: APP_VERSION,
            protocol: SYRUS_PROTOCOL,
            rawData: this._rawData,
            received: this._received,
            event:
            {
                device: this._deviceID,
                original: this._eventCode,
                created: this._created,
                location: {
                    latitude: this._latitude,
                    longitude: this._longitude,
                    speed: this._speed,
                    course: this._course
                }
            }

        }
    }
    info() {
        return {
            appVersion: APP_VERSION,
            protocol: SYRUS_PROTOCOL,
            rawData: this._rawData,
            received: this._received,
            info:
            {
                device: this._deviceID,
                firmware: this._firmware,
                hardware: this._hardware,
                cell: this._cell
            }

        }
    }

}