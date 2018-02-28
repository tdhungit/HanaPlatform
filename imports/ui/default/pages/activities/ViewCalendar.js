import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import moment from 'moment';

import {T, t, PT} from '/imports/common/Translation';
import {FullCalendar} from '../../components/FullCalendar/FullCalendar';

class ViewCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'month',
            date: new Date(),
            events: [
                {
                    title: 'Default event',
                    start: new Date(),
                    end: new Date(Date.now + 30 * 60 * 1000),
                }
            ],
        };

        this.onEventSelect = this.onEventSelect.bind(this);
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
                callback(this.state.events);
            },
        };

        return (
            <div className="activities-ViewCalendar animated fadeIn">
                <PT title={t.__('View Calendar')}/>
                <Card>
                    <CardHeader>
                        <i className="fa fa-calendar"/>
                        <strong><T>Calendar</T></strong>
                    </CardHeader>
                    <CardBody>
                        <div className="activities-calendar">
                            <FullCalendar options={calendarOptions}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ViewCalendar;
