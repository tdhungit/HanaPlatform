import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {frameworkConfig} from '../../../../config/config.inc';

export class NumberView extends Component {
    static propTypes = {
        value: PropTypes.number,
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        format: PropTypes.string,
        renderText: PropTypes.func
    };

    renderText(value) {
        const {renderText} = this.props;
        if (renderText) {
            return renderText(value);
        }

        return value;
    }

    render() {
        const {value, prefix, suffix, format} = this.props;

        return (
            <NumberFormat value={value || 0}
                          displayType="text"
                          thousandSeparator={true}
                          prefix={prefix || ''}
                          suffix={suffix || ''}
                          format={format || null}
                          renderText={value => this.renderText(value)}/>
        );
    }
}

export class NumberInput extends Component {
    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string,
        className: PropTypes.string,
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        format: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };

        this.onFocus = this.onFocus.bind(this);
    }

    componentWillMount() {
        this.state.value = this.props.value || 0;
    }

    onValueChange(values) {
        const {floatValue} = values;
        const {type, name, onChange} = this.props;
        this.setState({value: floatValue});

        const event = {
            target: {
                type: type || 'number',
                name: name,
                value: floatValue
            }
        };

        onChange && onChange(event);
    }

    onFocus(event) {
        event.target.select();
    }

    render() {
        const {prefix, suffix, format, className, type, name, value} = this.props;
        this.state.value = value;

        const align = this.props.textLeft ? 'text-left' : 'text-right';

        return <NumberFormat type={type || 'text'}
                             name={name}
                             disabled={this.props.disabled}
                             thousandSeparator={true}
                             className={(className || 'form-control') + ' ' + align}
                             prefix={prefix || ''}
                             suffix={suffix || ''}
                             value={this.state.value}
                             format={format || null}
                             onValueChange={(values) => this.onValueChange(values)}
                             onFocus={this.onFocus}/>;
    }
}

export class CurrencyView extends Component {
    static propTypes = {
        value: PropTypes.number,
        renderText: PropTypes.func
    };

    render() {
        const {value, renderText} = this.props;
        let prefix = '', suffix = '';
        if (frameworkConfig.currency.symbolPos === 'suffix') {
            suffix = frameworkConfig.currency.symbol;
        } else {
            prefix = frameworkConfig.currency.symbol;
        }

        return <NumberView value={value}
                           format={frameworkConfig.currency.format}
                           prefix={prefix}
                           suffix={suffix}
                           renderText={renderText}/>
    }
}

export class CurrencyInput extends Component {
    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func
    };

    onChange(event) {
        const {type, name, onChange} = this.props;
        const eventOut = {
            target: {
                type: type || 'currency',
                name: name,
                value: event.target.value
            }
        };

        onChange && onChange(eventOut);
    }

    render() {
        const {type, name, className, value} = this.props;
        let prefix = '', suffix = '';
        if (frameworkConfig.currency.symbolPos === 'suffix') {
            suffix = frameworkConfig.currency.symbol;
        } else {
            prefix = frameworkConfig.currency.symbol;
        }

        return <NumberInput type={type}
                            name={name}
                            disabled={this.props.disabled}
                            className={className}
                            value={value}
                            textLeft={this.props.textLeft}
                            format={frameworkConfig.currency.format}
                            prefix={prefix}
                            suffix={suffix}
                            onChange={(event) => this.onChange(event)}/>;
    }
}
