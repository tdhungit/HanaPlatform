import {Meteor} from 'meteor/meteor';
import Medias from './Medias';

Medias.denyClient();

Meteor.publish('medias.list', function () {
    return Medias.find({
        companyId: Meteor.user().companyId
    }).cursor;
});

Meteor.publish('medias.detail', function (mediaId) {
    return Medias.find({
        _id: mediaId,
        companyId: Meteor.user().companyId
    }).cursor;
});
