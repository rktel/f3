import { Events, Infos } from '../../imports/api/collections'

Meteor.methods({ 
    insertEvent: function(data) { 
         Events.insert(data)
    },
    insertInfo:function(data){
        Infos.insert(data)
    }
});