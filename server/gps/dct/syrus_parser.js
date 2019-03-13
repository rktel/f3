import { Time, Latitude, Longitude, Speed } from './syrus_convert'

const VERSION_FG = Meteor.settings.public.version

export default class SyrusParser {
    constructor(message) {
        if (message.includes('REV')) {
            this._deviceID = message.substring(message.indexOf('ID=') + 3, message.indexOf('<'))
            this._eventCode = parseInt(message.substr(4, 2))
            this._created = Time(message.substr(6, 10))
            this._latitude = Latitude(message.substr(16, 8))
            this._longitude = Longitude(message.substr(24, 9))
            this._speed = Speed(message.substr(33, 3))
            this._course = parseInt(message.substr(36, 3))
        }
        if (message.includes('RXART')) {
            this._deviceID = message.substring(message.indexOf('ID=') + 3, message.indexOf('<'))
            const splitMessage = message.split(';')
            this._firmware = splitMessage[1]
            this._hardware = splitMessage[2]
            this._cell = splitMessage[4]
        }

    }
    eventREV() {
        return {
            version: VERSION_FG,
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

    eventRXART() {
        return {
            version: VERSION_FG,
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