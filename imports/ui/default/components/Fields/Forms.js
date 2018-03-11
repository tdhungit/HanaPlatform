import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form'
import {Form as BForm} from 'reactstrap';

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

    render() {
        const InitForm = this.initForm;
        return <InitForm {...this.props}/>;
    }
}
