import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Activities from '/imports/collections/Activities/Activities';

class ViewActivity extends Component {
    render() {
        const {activity} = this.props;

        return (
            <div className="activities-ViewActivity">
                <PT title={activity.name}/>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-list"/>
                                <strong><T>View Activity</T></strong> {activity.name}
                                <div className="card-actions">
                                    <Link to={'/manager/activities/' + activity._id + '/edit'} title={t.__('Edit')}>
                                        <i className="fa fa-edit"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>

                            </CardBody>
                        </Card>
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
