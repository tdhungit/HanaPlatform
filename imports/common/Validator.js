/**
 * class for validate input
 */
class Validator {
    errors = {
        required: 'This field required',
        email: 'Invalid email address'
    };

    /**
     * change validate from string to object
     * @param validate
     * @returns {Array}
     */
    get(validate) {
        let validateVar = [];

        for (let idx in validate) {
            let func = validate[idx];
            if (this[func]) {
                validateVar.push(this[func]);
            }
        }

        return validateVar;
    }

    /**
     * check error
     * @param validate
     * @param value
     * @returns {*}
     */
    isError(validate, value) {
        for (let idx in validate) {
            let func = validate[idx];
            if (this[func]) {
                let error = this[func](value);
                if (error) {
                    return error;
                }
            }
        }

        return false;
    }

    /**
     * check input is require
     * @param value
     * @returns {*}
     */
    required = value => {
        return (value ? undefined : this.errors.required);
    };

    /**
     * check input is email
     * @param value
     * @returns {*}
     */
    email = value => {
        return (
            value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                ? this.errors.email
                : undefined
        )
    }
}

export const validator = new Validator();
