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
import ViewUsersTable from './ViewUsersTable';

class ViewUsers extends Component {
    constructor(props) {
        super(props);
    }

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
                            <CardBody className="card-body">
                                <ViewUsersTable pagination={pagination} limit={limit}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ViewUsers;
