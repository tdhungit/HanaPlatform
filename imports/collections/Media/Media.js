import {FilesCollection} from 'meteor/ostrio:files';

const Media = new FilesCollection({
    collectionName: 'media',
    allowClientCode: false, // Disallow remove files from Client
    storagePath: function () {
        return 'assets/uploads';
    },
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

export default Media;
