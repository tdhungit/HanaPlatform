import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Alert
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import FormActivity from './FormActivity';
import Activities from '/imports/collections/Activities/Activities';

class EditActivity extends Component {
    static viewInfo = {controller: 'Activities', action: 'Edit'};

    render() {
        const {activity} = this.props;

        if (!activity || !activity._id) {
            return <Alert color="warning"><T>No Data</T></Alert>
        }

        return (
            <div className="EditActivity animated fadeIn">
                <PT title={activity.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormActivity activity={activity} title={t.__("Edit Activity")} slogan={activity.name}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const activityId = props.match.params._id;
    const subscription = Meteor.subscribe('activities.detail', activityId);
    if (subscription && subscription.ready()) {
        onData(null, {
            activity: Activities.findOne(activityId)
        });
    }
}, EditActivity);
