import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, FormText} from 'reactstrap';
import {Field} from 'redux-form';

import {t} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import {SelectHelper, Select2Helper, SelectGroupHelper} from '../../helpers/inputs/SelectHelper';
import {DateInput} from '../../helpers/inputs/DateHelper';
import {TextEditor} from '../../helpers/inputs/TextEditor';

// Forms
import {Form, RForm} from './Forms';
export {Form, RForm};

// Fields
export class FieldView extends Component {
    static propTypes = {
        field: PropTypes.object.isRequired,
        record: PropTypes.object.isRequired
    };

    render() {
        const {field, record} = this.props;

        const fieldName = field.name;
        const value = utilsHelper.getField(record, fieldName);

        return <div>{value}</div>;
    }
}

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
        // this.setState({className: 'is-invalid'});
        this.props.onChange(event);
    }

    onBlur() {
        // this.setState({
        //     invalid: true,
        //     className: 'is-invalid',
        //     errorMessage: 'test'
        // });
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
        if (type === 'date' || type === 'datetime') {
            return <DateInput {...attributes}/>
        }
        if (type === 'texteditor') {
            return <TextEditor {...attributes}/>
        }
        if (type === 'dropdown') {
            return <SelectHelper {...attributes}/>
        }
        if (type === 'select2') {
            return <Select2Helper {...attributes}/>
        }
        if (type === 'selectgroup') {
            return <SelectGroupHelper {...attributes}/>
        }

        return (
            <div>
                <Input {...attributes} onChange={this.onChange} onBlur={this.onBlur}/>
                {this.state.invalid ? <FormText color="muted">{this.state.errorMessage}</FormText> : null}
            </div>
        );
    }
}

const renderFieldEdit = ({input, label, type, meta: {touched, error, warning}}) => {
    let attributes = utilsHelper.objectWithoutProperties(input, []);

    attributes.placeholder = label;
    if (!attributes.label) {
        attributes.placeholder = t.__('Enter here')
    }

    let component = <Input {...attributes}/>;

    if (type === 'date' || type === 'datetime') {
        component = <DateInput {...attributes}/>;
    }
    if (type === 'texteditor') {
        component = <TextEditor {...attributes}/>;
    }
    if (type === 'dropdown') {
        component = <SelectHelper {...attributes}/>;
    }
    if (type === 'select2') {
        component = <Select2Helper {...attributes}/>;
    }
    if (type === 'selectgroup') {
        component = <SelectGroupHelper {...attributes}/>
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

export class RFieldInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string
    };

    render() {
        let _props = this.props,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'label',
                'placeholder'
            ]);

        let placeholder = _props.placeholder;
        if (!_props.placeholder) {
            placeholder = t.__('Enter here')
        }

        return <Field {...attributes} label={placeholder} component={renderFieldEdit}/>
    }
}
