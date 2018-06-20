import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {
    Card, CardHeader, CardBody,
    Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import _ from 'underscore';
import moment from 'moment';

import {T, t, PT} from '/imports/common/Translation';
import {CalendarUtils} from '../../components/FullCalendar/FullCalendar';
import {utilsHelper} from '../../helpers/utils/utils';
import container from '../../../../common/Container';
import Activities from '../../../../collections/Activities/Activities';
import {frameworkConfig} from '../../../../config/config.inc';
import FormActivity from './FormActivity';
import Settings from '../../../../collections/Settings/Settings';
import Models from '/imports/collections/Models/Models';
import DetailComponent from '../models/components/DetailComponent';

class ViewCalendar extends Component {
    static viewInfo = {controller: 'Activities', action: 'View'};

    constructor(props) {
        super(props);

        this.state = {
            view: 'month',
            date: moment(),
            format: {},
            events: [],
            isCreateEvent: false,
            newEvent: {},
            isOpenEvent: false,
            openEvent: {},
        };

        this.onEventSelect = this.onEventSelect.bind(this);
        this.onEventClick = this.onEventClick.bind(this);
    }

    componentWillMount() {
        this.state.format = utilsHelper.getUserDateFormat();
        this.state.events = this.getEvents(this.props.events);
    }

    componentWillReceiveProps(nextProps) {
        const events = this.getEvents(nextProps.events);
        this.calendar.setOption('removeEvents');
        this.calendar.setOption('addEventSource', events);
        this.setState({events});
    }

    componentDidMount() {
        this.calendar = new CalendarUtils(
            this.refs['fullcalendar-container'],
            this.getCalendarOptions()
        );
    }

    getCalendarOptions() {
        return {
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
            timeFormat: 'HH:mm',

            select: this.onEventSelect,
            eventClick: this.onEventClick,

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
    }

    getEvents(currentEvents) {
        const colors = Settings.getListStrings('CalendarEventColor');
        const icons = Settings.getListStrings('CalendarEventIcon');
        const rawEvents = {...currentEvents};
        let events = [];
        _.each(rawEvents, (activity) => {
            const momentStart = moment(activity.dateStart);
            const momentEnd = moment(activity.dateEnd);

            let event  = {
                id: activity._id,
                title: activity.name,
                start: momentStart,
                end: momentEnd,
                allDay: activity.allDay || false,
                className: 'calendar-event-' + activity.type,
                icon: icons[activity.type],
                color: colors[activity.type],
                activity: activity // source activity
            };

            if (activity.repeat && activity.repeat.dayOfWeek && activity.repeat.dayOfWeek.length > 0) {
                event.start = activity.repeat.start || moment(activity.dateStart);
                event.end = activity.repeat.end || moment(activity.dateEnd);
                event.dow = activity.repeat.dayOfWeek;
                event.ranges = [{
                    start: moment(momentStart.format('YYYY-MM-DD')),
                    end: moment(momentEnd.format('YYYY-MM-DD')).endOf('day'),
                }];
            }

            events.push(event);
        });

        return events;
    }

    onEventSelect(start, end) {
        const newEvent = {...this.state.newEvent};
        const datetimeFormat = this.state.format.datetime;
        newEvent.dateStart = start.format(datetimeFormat);
        newEvent.dateEnd = end.format(datetimeFormat);
        this.setState({isCreateEvent: true, newEvent});
    }

    onEventClick(event, jsEvent, view) {
        const openEvent = event.activity || {};
        this.setState({
            openEvent: openEvent,
            isOpenEvent: true
        });
    }

    renderModalCreateEvent() {
        return (
            <Modal isOpen={this.state.isCreateEvent}
                   toggle={() => this.setState({isCreateEvent: true})}
                   className="modal-lg">
                <ModalHeader toggle={() => this.setState({isCreateEvent: false})}>
                    <i className={'fa fa-plus'}/> <T>Create Event</T>
                </ModalHeader>
                <ModalBody>
                    <FormActivity
                        activity={this.state.newEvent}
                        onSubmit={() => this.setState({isCreateEvent: false})}
                        onCancel={() => this.setState({isCreateEvent: false})}/>
                </ModalBody>
            </Modal>
        );
    }

    renderModalEvent() {
        const event = this.state.openEvent;
        const model = Models.getModel('Activities') || Activities.getLayouts();

        return (
            <Modal isOpen={this.state.isOpenEvent} toggle={() => {}} className="modal-lg">
                <ModalHeader toggle={() => this.setState({isOpenEvent: false})}>
                    <i className="fa fa-tasks"/> <T>{event.name}</T>
                </ModalHeader>
                <ModalBody>
                    <DetailComponent
                        title={false}
                        model={model}
                        record={this.state.openEvent}
                        editLink={false}/>
                </ModalBody>
            </Modal>
        );
    }

    render() {
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
                            <div ref="fullcalendar-container"/>
                        </div>
                    </CardBody>
                </Card>
                {this.renderModalCreateEvent()}
                {this.renderModalEvent()}
            </div>
        );
    }
}

export default container((props, onData) => {
    const currentDate = moment().format(frameworkConfig.dbDateFormat.datetime);
    Session.setDefault('viewCalendarStartDate', currentDate);
    Session.setDefault('viewCalendarEndDate', currentDate);
    const start = Session.get('viewCalendarStartDate');
    const end = Session.get('viewCalendarEndDate');
    Meteor.subscribe('activities.events', start, end);

    const events = Activities.findEvents(start, end).fetch();
    onData(null, {
        events: events
    });
}, ViewCalendar);
