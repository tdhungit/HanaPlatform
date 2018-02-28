// import {Meteor} from 'meteor/meteor';
// import Settings from '/imports/collections/Settings/Settings';

class UtilsHelper {
    getField(object, field, defaultValue = '') {
        let fieldKey = field;
        if (field.indexOf('.') < 0) {
            fieldKey = field;
        } else {
            const fieldArray = field.split('.');
            const length = fieldArray.length;
            for (let idx = 0; idx < (length - 1); idx++) {
                let objectKey = fieldArray[idx];
                if (object[objectKey]) {
                    object = object[objectKey];
                } else {
                    return defaultValue;
                }
            }
            fieldKey = fieldArray[(length - 1)];
        }

        if (object[fieldKey]) {
            return object[fieldKey];
        }
        return defaultValue;
    }

    inputChange(event, object) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let objectClean = object;

        if (name.indexOf('.') < 0) {
            objectClean[name] = value;
        } else {
            let nameArray = name.split('.');
            nameArray.push(value);
            this.createRecursiveObject(value, nameArray, objectClean);
        }

        return objectClean;
    }

    createRecursiveObject(value, propArr, resultingObj, index) {
        let prop;
        for (let j = index || 0, len1 = propArr.length; j < len1; j += 1) {
            prop = propArr[j];
            if (!resultingObj[prop]) {
                resultingObj[prop] = {};
            }
            if (propArr[j + 1] === value) {
                resultingObj[prop] = propArr[j + 1];
                j += 1;
            } else {
                this.createRecursiveObject(value, propArr, resultingObj[prop], j + 1);
                j = len1;
            }
        }
    }
}

const utilsHelper = new UtilsHelper();

export {
    utilsHelper
};
