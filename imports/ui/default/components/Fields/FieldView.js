import React, {Component} from 'react';
import {
    Input
} from 'reactstrap';
import {t} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import {
    SelectHelper,
    Select2Helper,
    SelectGroupHelper
} from '../../helpers/inputs/SelectHelper';
import {
    DateInput
} from '../../helpers/inputs/DateHelper';
import {
    TextEditor
} from '../../helpers/inputs/TextEditor';

class FieldDetailView extends Component {
    render() {
        const {
            field,
            object
        } = this.props;

        const value = object._id ? object[field] : object[field] || '';

        return <div>{value}</div>;
    }
}

class FieldEditView extends Component {
    render() {
        let _props = this.props,
            type = _props.type,
            placeholder = _props.placeholder,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'className',
                'cssModule',
                'type',
                'bsSize',
                'state',
                'valid',
                'addon',
                'static',
                'plaintext',
                'innerRef'
            ]);

        if (!placeholder) {
            placeholder = t.__('Enter here')
        }

        if (type === 'date' || type === 'datetime') {
            return <DateInput {...attributes} placeholder={placeholder}/>
        }

        if (type === 'texteditor') {
            return <TextEditor {...attributes} placeholder={placeholder}/>
        }

        if (type === 'dropdown') {
            return <SelectHelper {...attributes} placeholder={placeholder}/>
        }

        if (type === 'select2') {
            return <Select2Helper {...attributes} placeholder={placeholder}/>
        }

        if (type === 'selectgroup') {
            return <SelectGroupHelper {...attributes} placeholder={placeholder}/>
        }

        return <Input {...attributes} placeholder={placeholder}/>
    }
}

export {
    FieldDetailView,
    FieldEditView
}
