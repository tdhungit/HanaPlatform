import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import _ from 'underscore';
import moment from 'moment';

import {T, t, PT} from '/imports/common/Translation';
import {FullCalendar} from '../../components/FullCalendar/FullCalendar';
import {utilsHelper} from '../../helpers/utils/utils';
import container from '../../../../common/Container';
import Activities from '../../../../collections/Activities/Activities';
import {frameworkConfig} from '../../../../config/config.inc';

class ViewCalendar extends Component {
    static viewInfo = {controller: 'Activities', action: 'View'};

    constructor(props) {
        super(props);

        this.state = {
            view: 'month',
            date: new Date(),
            format: {},
            events: [],
        };

        this.onEventSelect = this.onEventSelect.bind(this);
    }

    componentWillMount() {
        const format = utilsHelper.getUserDateFormat();
        this.state.format = format;
        this.state.events = this.getEvents(this.props.events);
    }

    componentWillReceiveProps(nextProps) {
        const events = this.getEvents(nextProps.events);
        this.setState({
            events,
            date: moment(Session.get('viewCalendarStartDate'))
        });
    }

    getEvents(currentEvents) {
        const rawEvents = {...currentEvents};
        let events = [];
        _.each(rawEvents, (activity) => {
            events.push({
                title: activity.name,
                start: moment(activity.dateStart),
                end: moment(activity.dateEnd),
            });
        });

        return events;
    }

    onEventSelect(start, end) {
        const events = this.state.events;

        const newEventsSource = events.concat({
            title: `Event #${events.length}`,
            // moment object to simple date object
            start: start.toDate(),
            end: end.toDate(),
        });

        this.setState({
            events: newEventsSource,
        });
    }

    render() {
        console.log('render');
        const calendarOptions = {
            id: 'activities-calendar',
            defaultView: this.state.view,
            defaultDate: this.state.date,
            timezone: 'local',

            editable: true,
            droppable: true,
            selectable: true,

            slotDuration: '00:15',
            scrollTime: '08:00',
            columnFormat: 'ddd DD/MM',
            displayTime: true,
            firstDay: 1,

            select: this.onEventSelect,

            // please, use funciton events source for reactivity support
            events: (start, end, timezone, callback) => {
                const startDate = start.format(frameworkConfig.dbDateFormat.datetime);
                const endDate = end.format(frameworkConfig.dbDateFormat.datetime);
                Session.set({
                    viewCalendarStartDate: startDate,
                    viewCalendarEndDate: endDate
                });

                if (this.state.events) {
                    callback(this.state.events);
                }
            },
        };

        return (
            <div className="ViewCalendar animated fadeIn">
                <PT title={t.__('View Calendar')}/>
                <Card>
                    <CardHeader>
                        <i className="fa fa-calendar"/>
                        <strong><T>Calendar</T></strong>
                    </CardHeader>
                    <CardBody>
                        <div className="calendar">
                            <FullCalendar options={calendarOptions}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default container((props, onData) => {
    Session.setDefault('viewCalendarStartDate', moment().format(frameworkConfig.dbDateFormat.datetime));
    Session.setDefault('viewCalendarEndDate', moment().format(frameworkConfig.dbDateFormat.datetime));

    const start = Session.get('viewCalendarStartDate');
    const end = Session.get('viewCalendarEndDate');
    console.log(start + '/' + end);
    Meteor.subscribe('activities.events', start, end);
    const events = Activities.find({}).fetch();
    onData(null, {
        events: events
    });
}, ViewCalendar);
