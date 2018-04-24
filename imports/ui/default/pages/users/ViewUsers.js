import React, {Component} from 'react';
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
import Models from '/imports/collections/Models/Models';
import ListComponent from '../models/components/ListComponent';

class ViewUsers extends Component {
    static viewInfo = {controller: 'Users', action: 'List'};

    componentWillMount() {
        this.limit = 20;
        this.pagination = Users.pagination();
    }

    render() {
        const {
            pagination,
            limit
        } = this;

        const model = Models.getModel('Users') || Users.getLayouts();

        return (
            <div className="ViewUsers animated fadeIn">
                <PT title={t.__('View users')}/>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> <T>View Users</T>
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
        );
    }
}

export default ViewUsers;
