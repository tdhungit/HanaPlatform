import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class ReduxForm extends Component {
    propTypes = {
        children: PropTypes.node,
        onSubmit: PropTypes.func,
        reset: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool
    };

    childContextTypes = {
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
        const {onSubmit, pristine, reset, submitting} = this.props;
        return (
            <form onSubmit={onSubmit}>
                {this.props.children}
            </form>
        );
    }
}
