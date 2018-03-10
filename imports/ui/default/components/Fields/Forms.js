import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form as BForm} from 'reactstrap';

export class Form extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        onSubmit: PropTypes.func,
        reset: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool
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

export class RForm extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        onSubmit: PropTypes.func,
        reset: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool
    };

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
        const {className, onSubmit, pristine, reset, submitting} = this.props;
        return (
            <Form onSubmit={onSubmit} className={className}>
                {this.props.children}
            </Form>
        );
    }
}
