import {Meteor} from 'meteor/meteor';
import {FilesCollection} from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';
import Users from '../Users/Users';
import {aclAccess} from '../Users/aclUtils';

let mediasSchema = {
    ...FilesCollection.schema,
    companyId: {
        type: String,
        autoValue() {
            if (this.isInsert) {
                const userId = this.userId;
                const user = Users.getOne(userId);
                return user && user.companyId || '';
            }

            return this.value;
        }
    },
    mediaType: {type: String, defaultValue: 'UserAvatar'}
};

const Medias = new FilesCollection({
    collectionName: 'medias',
    schema: mediasSchema,
    allowClientCode: false, // Disallow remove files from Client
    storagePath() {
        return 'assets/uploads/medias';
    },
    onBeforeUpload(file) {
        if (this.user()) {
            // Allow upload files under 10MB, and only in png/jpg/jpeg formats
            if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
                return true;
            } else {
                return 'Please upload image, with size equal or less than 10MB';
            }
        } else {
            return 'Please Login';
        }
    }
});

Medias.collection.attachSchema(new SimpleSchema(mediasSchema));

/**
 * file upload
 * @param file
 * @param fileLocator
 * @param start function when upload start
 * @param end function
 * @param uploaded function when upload done
 * @param progress function
 */
Medias.upload = (file, fileLocator = 'Local', start, end, uploaded, progress) => {
    // check permission
    aclAccess('Medias', 'Create');

    Medias.insert({
        file: file,
        meta: {
            locator: fileLocator || 'Local',
            userId: Meteor.userId(),
            companyId: Meteor.user().companyId
        },
        streams: 'dynamic',
        chunkSize: 'dynamic'
    }, false)
        .on('start', () => {
            start && start();
        })
        .on('progress', function (progressPercent, fileObj) {
            progress && progress(progressPercent, fileObj);
        })
        .on('end', (error, fileObj) => {
            end && end(error, fileObj);
        })
        .on('uploaded', function (error, fileObj) {
            uploaded && uploaded(error, fileObj);
        })
        .start();
};

export default Medias;
