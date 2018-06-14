import React, {Component} from 'react';

import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
// import 'fullcalendar-scheduler';

import {isOption} from './utils';
import {t} from '/imports/common/Translation';

export class CalendarUtils {
    ref;
    options = {};
    onDateChanged;
    calendar;

    constructor(ref, options, onDateChanged) {
        this.ref = ref;
        this.options = options;
        this.onDateChanged = onDateChanged;

        this.calendar = $(this.ref);
        const calendarOptions = this.defaultFullCalendarOptions();
        this.calendar.fullCalendar(calendarOptions);
    }

    defaultFullCalendarOptions() {
        const {options, onDateChanged} = this;

        const defaultOptions = {
            viewRender(view) {
                const {intervalStart, intervalEnd} = view;

                const toDate = (momentDate) => momentDate.toDate();

                if (onDateChanged && typeof onDateChanged === 'function') {
                    onDateChanged(toDate(intervalStart), toDate(intervalEnd));
                }
            },

            eventRender: (event, element) => {
                if (event.icon) {
                    element.find(".fc-title").prepend("<i class='" + event.icon + "'/> ");
                }

                if (event.ranges) {
                    return (event.ranges.filter(function (range) {
                        return (event.start.isBefore(range.end) &&
                            event.end.isAfter(range.start));
                    }).length) > 0;
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
    }

    updateCalendar(newOptions) {
        const {options} = this;

        Object.keys(newOptions).forEach(optionName => {
            // update options dynamically
            if (isOption(optionName) && newOptions[optionName] !== options[optionName]) {
                calendar.fullCalendar('option', optionName, newOptions[optionName]);
            }
        });

        this.calendar.fullCalendar('refetchEvents');
        this.calendar.fullCalendar('changeView', newOptions.defaultView);
        this.calendar.fullCalendar('gotoDate', newOptions.defaultDate);
    }

    setOption(name, value) {
        if (!value) {
            this.calendar.fullCalendar(name);
        } else {
            this.calendar.fullCalendar(name, value);
        }
    }
}

/**
 * Example or use FullCalendar as a tag
 */
export class FullCalendar extends Component {
    componentDidMount() {
        const {options, onDateChanged} = this.props;
        this.calendar = new CalendarUtils(
            this.refs['fullcalendar-container'],
            options,
            onDateChanged
        );
    }

    componentWillReceiveProps(newProps) {
        const {options: newOptions} = newProps;
        this.calendar.updateCalendar(newOptions);
    }

    render() {
        return (
            <div ref="fullcalendar-container"/>
        );
    }
}
