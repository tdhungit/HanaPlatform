class Validator {
    errors = {
        required: 'This field required',
        email: 'Invalid email address'
    };

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

    required = value => {
        return (value ? undefined : this.errors.required);
    };

    email = value => {
        return (
            value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? this.errors.email
            : undefined
        )
    }
}

export const validator = new Validator();
