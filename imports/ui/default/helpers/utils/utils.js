import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import Settings from '../../../../collections/Settings/Settings';
import moment from 'moment';
import {t} from '../../../../common/Translation';
import {Bert} from 'meteor/themeteorchef:bert';
import {toast} from 'react-toastify';
import {frameworkConfig} from '../../../../config/config.inc';

class UtilsHelper {
    getRecordTitle(record, fields) {
        let title = '';
        _.each(fields, (fieldName) => {
            let fieldValue = record && record[fieldName] || '';
            title += fieldValue + ' ';
        });

        return this.trimSpace(title);
    }

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

        if (!name) {
            return objectClean;
        }

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

    /**
     * get current view component
     * @param component
     */
    currentComponentName(component) {
        let displayName = component.name;
        if (displayName === 'Container') {
            displayName = component.displayName;
            displayName = displayName.replace('Container', '');
            displayName = displayName.replace('(', '');
            displayName = displayName.replace(')', '');
        }

        return displayName;
    }

    /**
     * get system date format
     * @returns {{date: {}|string, datetime: {}|string|*}}
     */
    getSystemDateFormat() {
        const systemSettings = Settings.getSystemSettings();
        const dateFormat = systemSettings && systemSettings.dateFormat && systemSettings.dateFormat.value
            || frameworkConfig.dbDateFormat.date;
        const dateTimeFormat = systemSettings && systemSettings.dateTimeFormat && systemSettings.dateTimeFormat.value
            || frameworkConfig.dbDateFormat.datetime;

        return {
            date: dateFormat,
            datetime: dateTimeFormat
        };
    }

    /**
     * get user date format
     * @returns {{date: {}|string, datetime: *}}
     */
    getUserDateFormat() {
        const currentUser = Meteor.user();
        const userSettings = currentUser.settings || null
        const systemDateFormat = this.getSystemDateFormat();

        let dateFormat = systemDateFormat.date;
        if (userSettings && userSettings.dateFormat) {
            dateFormat = userSettings.dateFormat;
        }

        let dateTimeFormat = systemDateFormat.datetime;
        if (userSettings && userSettings.dateTimeFormat) {
            dateTimeFormat = userSettings.dateTimeFormat;
        }

        return {
            date: dateFormat,
            datetime: dateTimeFormat
        };
    }

    /**
     * display date
     * @param date
     * @returns {string}
     */
    toDateDisplay(date = null) {
        const format = this.getUserDateFormat().date;
        return moment(date).format(format);
    }

    /**
     * date to db
     * @param date
     * @returns {string}
     */
    toDateDb(date) {
        const format = this.getUserDateFormat().date;
        const dbFormat = frameworkConfig.dbDateFormat.date;
        return moment(date, format).format(dbFormat);
    }

    /**
     * display date time
     * @param datetime
     * @returns {string}
     */
    toDateTimeDisplay(datetime = null) {
        const format = this.getUserDateFormat().datetime;
        return moment(datetime).format(format);
    }

    /**
     * to datetime db
     * @param datetime
     * @returns {string}
     */
    toDatetimeDb(datetime) {
        const format = this.getUserDateFormat().datetime;
        const dbFormat = frameworkConfig.dbDateFormat.datetime;
        return moment(datetime, format).format(dbFormat);
    }

    /**
     * trim white space
     * @param str
     * @returns {*}
     */
    trimSpace(str) {
        return str.replace(/^\s+|\s+$/gm,'');
    }

    /**
     * get query filter for collection
     * @param filters
     */
    filtersToQuery(filters) {
        let query = {};

        for (let key in filters) {
            let value = filters[key];
            if (value) {
                query[key] = {$regex: value, $options: "i"};
            }
        }

        return query;
    }

    /**
     * merge 2 array
     * @param array1
     * @param array2
     * @returns {Array}
     */
    mergeArray(array1, array2) {
        let result_array = [];
        let arr = array1.concat(array2);
        let len = arr.length;
        let assoc = {};

        while(len--) {
            let item = arr[len];

            if(!assoc[item])
            {
                result_array.unshift(item);
                assoc[item] = true;
            }
        }

        return result_array;
    }

    /**
     * alertError
     * @param error
     */
    alertError(error) {
        console.log(error);
        Bert.alert(t.__('Error! Please contact with Admin'), 'danger');
    }

    /**
     * alert system message
     * @param error
     */
    alertSystem(error) {
        if (error) {
            this.alertError(error);
        } else {
            this.successMessage(t.__('Successful!'));
        }
    }

    /**
     * error message
     * @param message
     */
    errorMessage(message) {
        Bert.alert(message, 'danger');
    }
    infoMessage(message) {
        Bert.alert(message, 'info');
    }
    warningMessage(message) {
        Bert.alert(message, 'warning');
    }
    successMessage(message) {
        Bert.alert(message, 'success');
    }

    /**
     * toast
     * @param message
     */
    toast(message) {
        toast(message);
    }
    toastInfo(message) {
        toast.info(message);
    }
    toastSuccess(message) {
        toast.success(message);
    }
    toastWarning(message) {
        toast.warn(message);
    }
    toastError(message) {
        toast.error(message);
    }
}

export const utilsHelper = new UtilsHelper();
