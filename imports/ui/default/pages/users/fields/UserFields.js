import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {utilsHelper} from '../../../helpers/utils/utils';
import {FieldInput, FieldView} from '../../../components/Fields/Fields';
import container from '../../../../../common/Container';
import UserGroups from '../../../../../collections/UserGroups/UserGroups';

/**
 * UserFieldView
 */
export class UserFieldView extends Component {
    render() {
        const {field, record} = this.props;

        let fieldName = field.name;
        let fieldDisplay = field;

        if (field.alias) {
            fieldName = field.alias;
        }

        const value = utilsHelper.getField(record, fieldName);

        if (field.display) {
            fieldDisplay = Object.assign({}, field, field.display);
        }

        switch (field.type) {
            case 'userGroup':
                return <UserGroupField GFViewType='view' field={{...fieldDisplay}} value={value}/>;
            default:
                return <FieldView field={{...fieldDisplay}} value={value}/>;
        }
    }
}

/**
 * UserFieldInput
 */
export class UserFieldInput extends Component {
    render() {
        const {type} = this.props;
        switch (type) {
            case 'userGroup':
                return <UserGroupField GFViewType='input' {...this.props}/>;
            default:
                return <FieldInput {...this.props}/>;
        }
    }
}

/**
 * User Group Field
 */
class UserGroupFieldRender extends Component {
    renderView(attributes) {
        return <FieldView {...attributes}/>;
    }

    renderInput(attributes) {
        return <FieldInput {...attributes}/>;
    }

    render() {
        let attributes = utilsHelper.objectWithoutProperties(this.props, ['groups', 'GFViewType']);

        if (this.props.GFViewType === 'input') {
            attributes.type = 'dropdown';
            attributes.options = this.props.groups;
            return this.renderInput(attributes);
        }

        attributes.field.type = 'dropdown';
        attributes.field.options = this.props.groups;
        return this.renderView(attributes);
    }
}

const UserGroupField = container((props, onData) => {
    Meteor.subscribe('userGroups.list');
    onData(null, {
        groups: UserGroups.find().fetch()
    });
}, UserGroupFieldRender);
