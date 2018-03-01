import {Meteor} from 'meteor/meteor';
import Media from './Media';

Media.denyClient();
Meteor.publish('media.list', () => {
    return Media.find().cursor;
});

Meteor.publish('media.detail', (mediaId) => {
    return Media.find({_id: mediaId}).cursor;
});
