// import {Meteor} from 'meteor/meteor';
// import Settings from '/imports/collections/Settings/Settings';

class UtilsHelper {
    /**
     * get value from input with name as mongo field. example: user.profile.firstName
     * @param object
     * @param field
     * @param defaultValue
     * @returns {*}
     */
    getField(object, field, defaultValue = '') {
        if (!object) {
            return defaultValue;
        }

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

        if (typeof object[fieldKey] !== 'undefined') {
            return object[fieldKey];
        }

        return defaultValue;
    }

    /**
     * handle when user change value of input form
     * @param event
     * @param object
     * @returns {*}
     */
    inputChange(event, object) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let objectClean = object || {};

        if (name.indexOf('.') < 0) {
            objectClean[name] = value;
        } else {
            let nameArray = name.split('.');
            nameArray.push(value);
            this.createRecursiveObject(value, nameArray, objectClean);
        }

        return objectClean;
    }

    /**
     * create recursive object of input name (as field in mongo) when user change value of input
     * @param value
     * @param propArr
     * @param resultingObj
     * @param index
     */
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

    /**
     * example some key in object
     * @param obj
     * @param keys
     * @returns {{}}
     */
    objectWithoutProperties(obj, keys) {
        let target = {};
        for (let i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }
        return target;
    }
}

export const utilsHelper = new UtilsHelper();
