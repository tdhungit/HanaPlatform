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
            newEvent: {}
        };

        this.onEventSelect = this.onEventSelect.bind(this);
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
    }

    getEvents(currentEvents) {
        const rawEvents = {...currentEvents};
        let events = [];
        _.each(rawEvents, (activity) => {
            events.push({
                id: activity._id,
                title: activity.name,
                start: moment(activity.dateStart),
                end: moment(activity.dateEnd),
            });
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
