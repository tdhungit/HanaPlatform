import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Settings from '/imports/collections/Settings/Settings';
import {t} from '/imports/common/Translation';

import 'react-datepicker/dist/react-datepicker.css';
import {utilsHelper} from '../utils/utils';

/**
 * tag input field type date or datetime
 */
export class DateInput extends Component {
    constructor(props) {
        super(props);
        this.dateFormat = 'YYYY-MM-DD';
        this.timeFormat = 'HH:mm';
        this.dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
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
        const {type, name, onChange} = this.props;
        let inputType = 'date';
        let dateFormat = this.dateFormat;

        if (type === 'datetime') {
            inputType = 'datetime';
            dateFormat = this.dateTimeFormat;
        }

        if (type === 'time') {
            inputType = 'time';
            dateFormat = this.timeFormat;
        }

        const event = {
            dateValue: dateValue,
            target: {
                name: name,
                type: inputType,
                value: (type === 'time') ? dateValue : dateValue.format(dateFormat)
            }
        };

        onChange && onChange(event);
    }

    render() {
        const {type, value} = this.props;
        let formated = this.props.formated;
        let showTimeSelect = false;
        let dateFormat = this.dateFormat;

        if (type === 'datetime') {
            showTimeSelect = true;
            dateFormat = this.dateTimeFormat;
        }

        let timeOnly = false;
        if (type === 'time') {
            timeOnly = true;
            showTimeSelect = true;
            dateFormat = this.timeFormat;
            if (!formated) {
                formated = true;
            }
        }

        let selected = null;//moment();
        if (value) {
            if (formated) {
                selected = moment(value, dateFormat);
            } else {
                selected = moment(value);
            }
        }

        return (
            <div className="DateInputHelper">
                <DatePicker
                    name={name}
                    selected={selected}
                    onChange={this.handleChange}
                    dateFormat={dateFormat}
                    showTimeSelect={showTimeSelect}
                    timeFormat="HH:mm"
                    showTimeSelectOnly={timeOnly}
                    timeIntervals={15}
                    timeCaption={t.__('Time')}
                />
            </div>
        );
    }
}

export class DateView extends Component {
    render() {
        const {type, value, className} = this.props;
        let display = value;

        if (type === 'date') {
            display = utilsHelper.toDateDisplay(value)
        } else if (type === 'datetime') {
            display = utilsHelper.toDateTimeDisplay(value);
        }

        return <div className={className || ''}>{display}</div>;
    }
}
