
import { Mongo } from 'meteor/mongo'


export const Personal = new Mongo.Collection('personal');

/**GPS Data */
export const Events = new Mongo.Collection('events');
export const Infos = new Mongo.Collection('infos');
export const Last = new Mongo.Collection('last');
export const Devices = new Mongo.Collection('devices');
export const Commands = new Mongo.Collection('commands');
export const Scripts = new Mongo.Collection('scripts');
export const Tasks = new Mongo.Collection('tasks');

// F4.0  14/07/2019
export const Report = new Mongo.Collection('report');
export const Mobiles = new Mongo.Collection('mobiles');

