import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, formValueSelector} from 'redux-form'
import {Form as BForm} from 'reactstrap';
import {utilsHelper} from '../../helpers/utils/utils';

/**
 * normal form
 */
export class Form extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        onSubmit: PropTypes.func
    };

    render() {
        const props = this.props;
        return (
            <BForm {...props}>
                {props.children}
            </BForm>
        );
    }
}

/**
 * render redux form
 */
class RFormInit extends Component {
    static childContextTypes = {
        reset: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool
    };

    getChildContext() {
        return {
            reset: this.props.reset,
            pristine: this.props.pristine,
            submitting: this.props.submitting
        };
    }

    render() {
        const {className, onSubmit, children, reset, pristine, submitting} = this.props;
        return (
            <Form onSubmit={onSubmit} className={className}>
                {children}
            </Form>
        );
    }
}

/**
 * redux form
 */
export class RForm extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.string,
        children: PropTypes.node,
        onSubmit: PropTypes.func
    };

    componentWillMount() {
        this.initForm = reduxForm({
            form: this.props.name
        })(RFormInit);
    }

    onSubmit(event) {
        event.preventDefault();
        const selector = formValueSelector(this.props.name);
        if (this.props.onSubmit) {
            this.props.onSubmit(selector);
        }
    }

    render() {
        const InitForm = this.initForm;
        const attributes = utilsHelper.objectWithoutProperties(this.props, [
            'onSubmit'
        ]);
        return <InitForm {...this.props} onSubmit={this.onSubmit.bind(this)}/>;
    }
}
