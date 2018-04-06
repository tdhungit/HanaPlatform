import React, {Component} from 'react';
import {_} from 'meteor/underscore';
import PropTypes from 'prop-types';

/**
 * render array field
 */
export class ArrayFieldValue extends Component {
    static propTypes = {
        fields: PropTypes.array,
        value: PropTypes.array,
        renderRow: PropTypes.func

    };

    renderRow(record) {
        const {fields, renderRow} = this.props;

        if (renderRow) {
            return renderRow(record);
        }

        let fieldsRender = [];
        _.each(fields, (field) => {
            fieldsRender.push(
                <div key={field}>{record && record[field] || ''}</div>
            )
        });

        return fieldsRender;
    }

    render() {
        const {className, fields, value} = this.props;

        return (
            <div className={className || ''}>
                {value.map((record) => {
                    if (fields === false) {
                        <div key={record}>{record}</div>
                    }

                    return this.renderRow(record);
                })}
            </div>
        );
    }
}