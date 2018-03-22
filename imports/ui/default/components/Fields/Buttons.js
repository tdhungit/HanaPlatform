import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {utilsHelper} from '../../helpers/utils/utils';

/**
 * button for normal field
 */
export class FieldButton extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired
    };

    render() {
        let _props = this.props,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'label',
                'pristine',
                'submitting'
            ]);

        return <Button {...attributes}>{_props.label}</Button>
    }
}

/**
 * button for Redux Form
 */
export class RFieldButton extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired
    };

    static contextTypes = {
        reset: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let _props = this.props,
            attributes = utilsHelper.objectWithoutProperties(_props, [
                'label',
                'pristine',
                'submitting'
            ]);

        return <Button {...attributes}
                       disabled={this.context.pristine || this.context.submitting}>{_props.label}</Button>
    }
}
