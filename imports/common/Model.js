import {coreCollections, customCollections} from '/imports/collections/collections';
import CollectionAssign from '/imports/common/CollectionAssign';

class MyModel {
    getCollection(collectionName) {
        if (customCollections.includes(collectionName)) {
            return require('/imports/collections/' + collectionName + '/' + collectionName).default;
        }

        if (coreCollections.includes(collectionName)) {
            return new CollectionAssign(collectionName);
        }

        return false;
    }
}

const myModel = new MyModel();
export {
    myModel
}