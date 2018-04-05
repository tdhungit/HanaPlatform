import {Meteor} from 'meteor/meteor';
import {FilesCollection} from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';
import Users from '../Users/Users';

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
    }
};

const Medias = new FilesCollection({
    collectionName: 'medias',
    schema: mediasSchema,
    allowClientCode: false, // Disallow remove files from Client
    storagePath() {
        return 'assets/uploads/medias';
    },
    downloadRoute() {
        return 'medias'
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
 * @param callback function when upload done
 * @param progress function
 * @param end function
 */
Medias.upload = (file, fileLocator = 'Local', start, callback, progress, end) => {
    const uploadInstance = Medias.insert({
        file: file,
        meta: {
            locator: fileLocator || 'Local',
            userId: Meteor.userId(),
            companyId: Meteor.user().companyId
        },
        streams: 'dynamic',
        chunkSize: 'dynamic'
    }, false);

    uploadInstance.on('start', () => {
        start && start();
    });

    uploadInstance.on('progress', function (progressPercent, fileObj) {
        progress && progress(progressPercent, fileObj);
    });

    uploadInstance.on('end', (error, fileObj) => {
        end && end(error, fileObj);
    });

    uploadInstance.on('uploaded', function (error, fileObj) {
        callback && callback(error, fileObj);
    });

    uploadInstance.start();
};

export default Medias;
