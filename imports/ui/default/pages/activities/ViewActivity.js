import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import Activities from '/imports/collections/Activities/Activities';
import DetailComponent from '../models/components/DetailComponent';

class ViewActivity extends Component {
    static viewInfo = {controller: 'Activities', action: 'View'};

    render() {
        const {activity} = this.props;

        const model = Models.getModel('Activities') || Activities.getLayouts();

        return (
            <div className="ViewActivity">
                <PT title={activity.name}/>
                <Row>
                    <Col md="12">
                        <DetailComponent
                            title={t.__('View Activity')}
                            model={model}
                            record={activity}
                            editLink="/manager/activities/%s/edit"/>
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
}, ViewActivity);
