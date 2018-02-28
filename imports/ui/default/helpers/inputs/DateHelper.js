import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Settings from '/imports/collections/Settings/Settings';

import 'react-datepicker/dist/react-datepicker.css';

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.dateFormat = 'YYYY-MM-DD';
        this.dateTimeFormat = 'YYYY-MM-DD HH:mm';
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const currentUser = Meteor.user();
        const userSettings = currentUser.settings || false;
        const systemSettings = Settings.getSystemSettings();

        if (userSettings && userSettings.dateFormat) {
            this.dateFormat = userSettings.dateFormat;
        } else if (systemSettings.dateFormat) {
            this.dateFormat = systemSettings.dateFormat.value;
        }

        if (userSettings && userSettings.dateTimeFormat) {
            this.dateTimeFormat = userSettings.dateTimeFormat;
        } else if (systemSettings.dateTimeFormat) {
            this.dateTimeFormat = systemSettings.dateTimeFormat.value;
        }
    }

    handleChange(dateValue) {
        let inputType = 'date';
        let dateFormat = this.dateFormat;
        if (this.props.type = 'datetime') {
            inputType = 'datetime';
            dateFormat = this.dateTimeFormat;
        }

        const event = {
            dateValue: dateValue,
            target: {
                name: this.props.name,
                type: inputType,
                value: dateValue.format(dateFormat)
            }
        };
        this.props.onChange(event);
    }

    render() {
        let showTimeSelect = false;
        let dateFormat = this.dateFormat;
        if (this.props.type == 'datetime') {
            showTimeSelect = true;
            dateFormat = this.dateTimeFormat;
        }

        let selected = moment();
        if (this.props.value) {
            selected = moment(this.props.value, dateFormat);
        }

        return (
            <div className="DateInputHelper">
                <DatePicker name={name}
                            dateFormat={dateFormat}
                            selected={selected}
                            onChange={this.handleChange}
                            showTimeSelect={showTimeSelect}
                />
            </div>
        );
    }
}

export {
    DateInput
}
