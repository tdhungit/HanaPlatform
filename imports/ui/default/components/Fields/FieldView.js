import React, {Component} from 'react';
import {Input, FormText} from 'reactstrap';
import {t} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import {SelectHelper, Select2Helper, SelectGroupHelper} from '../../helpers/inputs/SelectHelper';
import {DateInput} from '../../helpers/inputs/DateHelper';
import {TextEditor} from '../../helpers/inputs/TextEditor';

export class FieldDetailView extends Component {
    render() {
        const {
            field,
            record
        } = this.props;

        const fieldName = field.name;
        const value = utilsHelper.getField(record, fieldName);

        return <div>{value}</div>;
    }
}

export class FieldEditView extends Component {
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
        this.setState({className: 'is-invalid'});
        this.props.onChange(event);
    }

    onBlur() {
        this.setState({
            invalid: true,
            className: 'is-invalid',
            errorMessage: 'test'
        });
    }

    render() {
        let _props = this.props,
            type = _props.type,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'onChange',
                'onBlur'
            ]);

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
