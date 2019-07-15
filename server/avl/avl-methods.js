import { Report } from '../../imports/api/collections';

Meteor.methods({
    insertReport: function (data) {
        Report.insert(data)
    }
});