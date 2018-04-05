import {Meteor} from 'meteor/meteor';
import Medias from './Medias';

Medias.denyClient();
Meteor.publish('medias.list', function () {
    return Medias.find({
        companyId: Meteor.user().companyId
    }).cursor;
});
