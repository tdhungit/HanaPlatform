import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {T, t, PT} from '/imports/common/Translation';

class ViewActivities extends Component {
    render() {
        return (
            <div className="activities-ViewActivities animated fadeIn">
                <PT title={t.__('View Activities')}/>
                <Card>
                    <CardHeader>
                        <i className="fa fa-tasks"/>
                        <strong><T>View Activities</T></strong>
                        <div className="card-actions">
                            <Link to="/manager/activities/create">
                                <i className="fa fa-plus-circle"/>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ViewActivities;
