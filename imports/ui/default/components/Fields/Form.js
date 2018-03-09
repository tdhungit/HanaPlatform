import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Form extends Component {
    propTypes = {
        children: PropTypes.node,
        values: PropTypes.object,
        update: PropTypes.func,
        reset: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}
