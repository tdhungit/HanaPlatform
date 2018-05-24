import React, {Component} from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
// import 'fullcalendar-scheduler';

import {isOption} from './utils';
import {t} from '/imports/common/Translation';

export const defaultFullCalendarOptions = (options, onDateChanged) => {
    const defaultOptions = {
        viewRender(view) {
            const {intervalStart, intervalEnd} = view;

            const toDate = (momentDate) => momentDate.toDate();

            if (onDateChanged && typeof onDateChanged === 'function') {
                onDateChanged(toDate(intervalStart), toDate(intervalEnd));
            }
        },
    };

    let calendarOptions = Object.assign({}, defaultOptions, options);
    // default calendar config
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

    return calendarOptions;
};

export const getFullCalendar = (ref, options, onDateChanged) => {
    const calendar = $(ref);
    const calendarOptions = defaultFullCalendarOptions(options, onDateChanged);
    calendar.fullCalendar(calendarOptions);
    return calendar;
};

export const updateCalendar = (calendar, options, newOptions) => {
    Object.keys(newOptions).forEach(optionName => {
        // update options dynamically
        if (isOption(optionName) && newOptions[optionName] !== options[optionName]) {
            calendar.fullCalendar('option', optionName, newOptions[optionName]);
        }
    });

    calendar.fullCalendar('refetchEvents');
    calendar.fullCalendar('changeView', newOptions.defaultView);
    calendar.fullCalendar('gotoDate', newOptions.defaultDate);

    if (newOptions.renderEvent) {
        calendar.fullCalendar('renderEvent', newOptions.renderEvent);
    }

    if (newOptions.addEventSource) {
        calendar.fullCalendar('addEventSource', newOptions.addEventSource);
    }

    return calendar;
};

export class FullCalendar extends Component {
    componentDidMount() {
        const {options, onDateChanged} = this.props;
        this.calendar = getFullCalendar(this.refs['fullcalendar-container'], options, onDateChanged);
    }

    componentWillReceiveProps(newProps) {
        const {options: newOptions} = newProps;
        const {options} = this.props;
        this.calendar = updateCalendar(this.calendar, options, newOptions);
    }

    render() {
        return (
            <div ref="fullcalendar-container"/>
        );
    }
}
