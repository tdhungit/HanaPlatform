import {Meteor} from 'meteor/meteor';
import {t} from '../../../../../common/Translation';
import {utilsHelper} from '../../../helpers/utils/utils';

export class NotificationUtils {
    static read(_id) {
        Meteor.call('notifications.read', _id, true, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            }
        });
    }

    static notified(_id) {
        Meteor.call('notifications.notified', _id, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            }
        });
    }

    static join(user, notify) {
        if (!notify.users || !notify.users[user._id]) {
            utilsHelper.errorMessage(t.__('Error! Please contact with Admin'));
        } else {
            notify.users[user._id].status = 'Active';
            Meteor.call('chatChannels.update', notify, (error) => {
                if (error) {
                    utilsHelper.alertError(error);
                }
            });
        }
    }
}
