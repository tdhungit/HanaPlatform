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
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';
import ListComponent from '../models/components/ListComponent';
import Models from '/imports/collections/Models/Models';

class ViewRoles extends Component {
    static viewInfo = {controller: 'ACL', action: 'List'};

    componentWillMount() {
        this.limit = ACLRoles.getLimit();
        this.pagination = ACLRoles.pagination();
    }

    render() {
        const {
            pagination,
            limit
        } = this;

        const model = Models.getModel('ACLRoles') || ACLRoles.getLayouts();

        return (
            <div className="ViewRoles animated fadeIn">
                <PT title={t.__('View Roles')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-list"/>
                                <strong><T>View Roles</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/roles/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ListComponent
                                    model={model}
                                    pagination={pagination}
                                    limit={limit}
                                    detailLink="/manager/roles/%s/detail"
                                    editLink="/manager/roles/%s/edit"/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewRoles;
