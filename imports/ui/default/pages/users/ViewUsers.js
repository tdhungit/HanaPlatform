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

import {T, t, PT} from '/imports/common/Translation';
import Users from '/imports/collections/Users/Users';
import ListComponent from '../models/components/ListComponent';
import Models from '/imports/collections/Models/Models';
import {userLayouts} from '/imports/collections/Users/layouts';

class ViewUsers extends Component {
    componentWillMount() {
        this.limit = 20;
        const limit = this.limit;
        this.pagination = new Meteor.Pagination(Users, {
            name: 'users.paginatedList',
            filters: {},
            sort: {},
            perPage: limit,
            reactive: true,
            debug: false
        });
    }

    render() {
        const {
            pagination,
            limit
        } = this;

        const model = Models.getModel('Users') || userLayouts;

        return (
            <div className="users-Users animated fadeIn">
                <PT title={t.__('View users')}/>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> <T>View Users</T>
                                <div className="card-actions">
                                    <Link to={'/manager/users/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ListComponent
                                    model={model}
                                    pagination={pagination}
                                    limit={limit}
                                    detailLink="/manager/users/%s/detail"
                                    editLink="/manager/users/%s/edit"/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ViewUsers;
