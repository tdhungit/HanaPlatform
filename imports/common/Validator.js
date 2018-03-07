class Validator {
    error = false;
    message = '';

    errorMessages = {
        require: 'This field required'
    };

    validate(value, props, type) {
        if (!props[type]) {
            return true;
        }

        switch (type) {
            case 'required':
                return this.required(value);
            default:
                return true;
        }
    }

    required(value) {
        if (value) {
            return true;
        }

        return false;
    }
}

export const validator = new Validator();
