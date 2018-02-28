import React, {Component} from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
// import 'fullcalendar-scheduler';

import {isOption} from './utils';
import {t} from '/imports/common/Translation';


class FullCalendar extends Component {
    componentDidMount() {
        const {options, onDateChanged} = this.props;

        this.extendCalendarOptions = (calendarOptions) => {
            const defaultOptions = {
                viewRender(view) {
                    const {intervalStart, intervalEnd} = view;

                    const toDate = (momentDate) => momentDate.toDate();

                    if (onDateChanged && typeof onDateChanged === 'function') {
                        onDateChanged(toDate(intervalStart), toDate(intervalEnd));
                    }
                },
            };

            return Object.assign({}, defaultOptions, calendarOptions);
        };

        this.calendar = $(this.refs['fullcalendar-container']);

        const calendarOptions = this.extendCalendarOptions(options);

        // default options
        if (!calendarOptions.header) {
            calendarOptions.header = {
                left: 'prev,today,next',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            };
        }

        if (!calendarOptions.buttonText) {
            calendarOptions.buttonText = {
                today: t.__('Today'),
                month: t.__('Month'),
                week: t.__('Week'),
                day: t.__('Day'),
                list: t.__('List'),
                prev: t.__('Back'),
                next: t.__('Next')
            };
        }

        if (!calendarOptions.themeSystem) {
            calendarOptions.themeSystem = 'bootstrap3';
        }

        this.calendar.fullCalendar(calendarOptions);
    }

    componentWillReceiveProps(newProps) {
        const {options: newOptions} = newProps;
        const {options} = this.props;


        Object.keys(newOptions).forEach(optionName => {
            // update options dynamically
            if (isOption(optionName) && newOptions[optionName] !== options[optionName]) {
                this.calendar.fullCalendar('option', optionName, newOptions[optionName]);
            }
        });

        this.calendar.fullCalendar('refetchEvents');
        this.calendar.fullCalendar('changeView', newOptions.defaultView);
        this.calendar.fullCalendar('gotoDate', newOptions.defaultDate);
    }

    render() {
        return (
            <div ref="fullcalendar-container"></div>
        );
    }
}

FullCalendar.propTypes = {
    options: PropTypes.object,
    onDateChanged: PropTypes.func,
};

export {
    FullCalendar
};