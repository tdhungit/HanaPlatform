import {Meteor} from 'meteor/meteor';
import Media from './Media';

Media.denyClient();
Meteor.publish('media.list', function () {
    return Media.find().cursor;
});
