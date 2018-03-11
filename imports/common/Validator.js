class Validator {
    errors = {
        required: 'This field required',
        email: 'Invalid email address'
    };

    get(validate) {
        let validateVar = [];

        for (let idx in validate) {
            let func = validate[idx];
            validateVar.push(this[func]);
        }

        return validateVar;
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
