import React, {Component} from 'react';
import {_} from 'meteor/underscore';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {FieldInput, FieldView} from '../../components/Fields/Fields';
import {utilsHelper} from '../utils/utils';

/**
 * render array field
 */
export class ArrayFieldView extends Component {
    static propTypes = {
        renderRow: PropTypes.func,
        itemType: PropTypes.string,
        value: PropTypes.array
    };

    renderRow(record) {
        const {fields, renderRow, itemType} = this.props;

        if (renderRow) {
            return renderRow(record);
        }

        if (!fields || typeof fields !== 'array') {
            return <div>{record}</div>;
        }

        let fieldsRender = [];
        _.each(fields, (field) => {
            fieldsRender.push(
                <div key={field}>
                    <FieldView field={{type: itemType}} value={record && record[field] || ''}/>
                </div>
            );
        });

        return fieldsRender;
    }

    render() {
        const {className, value} = this.props;

        return (
            <div className={className || ''}>
                {value.map((record) => {
                    return this.renderRow(record);
                })}
            </div>
        );
    }
}

/**
 * render and handle array input field
 */
export class ArrayFieldInput extends Component {
    static propTypes = {
        renderInput: PropTypes.object,
        renderViewRow: PropTypes.object,
        itemType: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            array: []
        };

        this.onChange = this.onChange.bind(this);
        this.newRow = this.newRow.bind(this);
    }

    newRow() {
        if (this.state.rowValue) {
            let array = this.state.array;
            array.push(this.state.rowValue);
            this.setState({array: array});
        }
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({rowValue: value});
    }

    renderViewRow() {
        const {renderViewRow, itemType} = this.props;
        if (renderViewRow) {
            return renderViewRow;
        }

        const field = {
            type: itemType
        };

        return (
            <div className="ArrayViewRow">
                {this.state.array.map((item, i) => {
                    return <FieldView key={i} field={field} value={item}/>;
                })}
            </div>
        );
    }

    renderInput() {
        const {renderInput, itemType} = this.props;

        if (renderInput) {
            return renderInput;
        }

        const attributes = utilsHelper.objectWithoutProperties(this.props, [
            'type',
            'onChange'
        ]);

        return (
            <div className="ArrayInput">
                <Button type="button" outline color="info"
                        style={{marginBottom: 5}}
                        onClick={this.newRow}>
                    <i className="fa fa-plus-square"/>
                </Button>

                <FieldInput type={itemType} {...attributes} onChange={this.onChange}/>
            </div>
        );
    }

    render() {
        const {className} = this.props;

        return (
            <div className={className}>
                {this.renderViewRow()}
                {this.renderInput()}
            </div>
        );
    }
}