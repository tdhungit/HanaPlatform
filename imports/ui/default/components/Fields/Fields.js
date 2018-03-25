import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, FormText} from 'reactstrap';
import {Field} from 'redux-form';

import {t} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import {validator} from '/imports/common/Validator';
import {
    SelectHelper,
    Select2Helper,
    SelectGroupHelper,
    SelectValue
} from '../../helpers/inputs/SelectHelper';
import {DateInput} from '../../helpers/inputs/DateHelper';
import {TextEditor} from '../../helpers/inputs/TextEditor';
import {ArrayFieldValue} from '../../helpers/tags/ArrayValue';

/*----- FORM -----*/
import {Form, RForm} from './Forms';

export {Form, RForm};

/*----- BUTTON -----*/
import {FieldButton, RFieldButton} from './Buttons';

export {FieldButton, RFieldButton};

/*----- FIELD DISPLAY -----*/
/**
 * display field value
 */
export class FieldView extends Component {
    static propTypes = {
        field: PropTypes.object.isRequired,
        record: PropTypes.object.isRequired
    };

    render() {
        const {field, record} = this.props;
        let fieldName = field.name;
        if (field.alias) {
            fieldName = field.alias;
        }

        let value = utilsHelper.getField(record, fieldName);

        if (field.display) {
            if (field.display.type === 'array') {
                let fieldDisplay = '';
                for (let idx in value) {
                    let item = value[idx];
                    for (let idx2 in field.display.fields) {
                        let displayKey = field.display.fields[idx2];
                        fieldDisplay += item[displayKey] + ' ';
                    }
                }

                value = fieldDisplay;
            }
        }

        switch (field.type) {
            case 'select':
            case 'dropdown':
                return <SelectValue options={field.options} value={value}/>;
            case 'array':
                return <ArrayFieldValue/>;
            default:
                return <span>{value}</span>;
        }
    }
}

/*----- FIELD INPUT -----*/
/**
 * field input for normal form
 */
export class FieldInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        validate: PropTypes.array,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            invalid: false,
            className: '',
            errorMessage: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event) {
        if (this.props.validate) {
            const error = validator.isError(this.props.validate, event.target.value);
            if (error) {
                this.setState({
                    invalid: true,
                    className: 'is-invalid',
                    errorMessage: error
                });
            }
        }

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onBlur(event) {
        if (this.props.validate) {
            const error = validator.isError(this.props.validate, event.target.value);
            if (error) {
                this.setState({
                    invalid: true,
                    className: 'is-invalid',
                    errorMessage: error
                });
            }
        }

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    render() {
        let _props = this.props,
            type = _props.type,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'onChange',
                'onBlur'
            ]);

        if (!type) {
            type = 'text';
        }

        attributes.className = attributes.className ? (this.state.className + ' ' + attributes.className) : this.state.className;

        if (!attributes.placeholder) {
            attributes.placeholder = t.__('Enter here')
        }

        switch (type) {
            case 'date':
            case 'datetime':
                return <DateInput {...attributes}/>;
            case 'texteditor':
                return <TextEditor {...attributes}/>;
            case 'dropdown':
                return <SelectHelper {...attributes}/>;
            case 'select2':
                return <Select2Helper {...attributes}/>;
            case 'selectgroup':
                return <SelectGroupHelper {...attributes}/>
            default:
                return (
                    <div>
                        <Input {...attributes} onChange={this.onChange} onBlur={this.onBlur}/>
                        {this.state.invalid ? <FormText color="muted">{this.state.errorMessage}</FormText> : null}
                    </div>
                );
        }
    }
}

/**
 * render field input for Redux Form
 * @param input
 * @param label
 * @param type
 * @param touched
 * @param error
 * @param warning
 * @returns {*}
 */
const renderFieldEdit = ({input, label, type, meta: {touched, error, warning}}) => {
    let attributes = utilsHelper.objectWithoutProperties(input, []);

    attributes.placeholder = label;
    if (!attributes.label) {
        attributes.placeholder = t.__('Enter here')
    }

    let component = null;
    switch (type) {
        case 'date':
        case 'datetime':
            component = <DateInput {...attributes}/>;
            break;
        case 'texteditor':
            component = <TextEditor {...attributes}/>;
            break;
        case 'dropdown':
            component = <SelectHelper {...attributes}/>;
            break;
        case 'select2':
            component = <Select2Helper {...attributes}/>;
            break;
        case 'selectgroup':
            component = <SelectGroupHelper {...attributes}/>
            break;
        default:
            component = <Input {...attributes}/>;
            break;
    }

    return (
        <div>
            {component}
            {touched &&
            ((error && <FormText color="muted">{error}</FormText>) ||
                (warning && <FormText color="warning">{warning}</FormText>))}
        </div>
    );
};

/**
 * field input for Redux form
 */
export class RFieldInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        validate: PropTypes.array
    };

    render() {
        let _props = this.props,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'label',
                'placeholder',
                'validate'
            ]);

        let placeholder = _props.placeholder;
        if (!_props.placeholder) {
            placeholder = t.__('Enter here')
        }

        return <Field {...attributes}
                      label={placeholder}
                      validate={validator.get(_props.validate)}
                      component={renderFieldEdit}/>
    }
}
