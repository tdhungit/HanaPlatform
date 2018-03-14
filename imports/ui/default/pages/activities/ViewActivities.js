import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {T, t, PT} from '/imports/common/Translation';
import Activities from '/imports/collections/Activities/Activities';
import {activityLayouts} from '/imports/collections/Activities/layouts';
import ListComponent from '../models/components/ListComponent';
import Models from '../../../../collections/Models/Models';

class ViewActivities extends Component {
    componentWillMount() {
        this.limit = 20;
        const limit = this.limit;
        this.pagination = new Meteor.Pagination(Activities, {
            filters: {},
            sort: {},
            perPage: limit,
            reactive: true,
            debug: false
        });
    }

    render() {
        const model = Models.getModel('Activities') || activityLayouts;

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
                        <ListComponent
                            model={model}
                            pagination={this.pagination}
                            limit={this.limit}
                            detailLink="/manager/activities/%s/detail"
                            editLink="/manager/activities/%s/edit"/>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ViewActivities;
