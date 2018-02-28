import {Mongo} from 'meteor/mongo';

class CollectionBase extends Mongo.Collection {
    constructor(collection, options) {
        super(collection, options);
    }

    beforeInsert(doc) {
        return true;
    }

    afterInsert(doc, resultInsert) {

    }

    beforeUpdate(selector, modifiers, options) {
        return true;
    }

    afterUpdate(selector, modifiers, options, resultUpdate) {

    }

    insert(doc, callback) {
        if (this.beforeInsert(doc)) {
            const result = super.insert(doc, callback);
            this.afterInsert(doc, result);
            return result;
        }

        return false;
    }

    update(selector, modifiers, options, callback) {
        if (this.beforeUpdate(selector, modifiers, options)) {
            const result = super.update(selector, modifiers, options, callback);
            this.afterUpdate(selector, modifiers, options, result);
            return result;
        }

        return false;
    }
}

export default CollectionBase;
