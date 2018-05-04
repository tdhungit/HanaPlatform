import {Meteor} from 'meteor/meteor';
import Medias from './Medias';

Medias.denyClient();

Meteor.publish('medias.list', function (mediaType) {
    return Medias.find({
        companyId: Meteor.user().companyId,
        mediaType: mediaType
    }).cursor;
});

Meteor.publish('medias.detail', function (mediaId) {
    return Medias.find({
        _id: mediaId,
        companyId: Meteor.user().companyId
    }).cursor;
});
