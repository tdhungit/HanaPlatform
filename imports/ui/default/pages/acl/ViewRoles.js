import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';

import {T, t, PT} from '/imports/common/Translation';
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';
import ListComponent from '../models/components/ListComponent';
import Models from '/imports/collections/Models/Models';
import {aclRoleLayouts} from '/imports/collections/ACLRoles/layouts';

class ViewRoles extends Component {
    componentWillMount() {
        this.limit = 20;
        const limit = this.limit;
        this.pagination = new Meteor.Pagination(ACLRoles, {
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

        const model = Models.getModel('ACLRoles') || aclRoleLayouts;

        return (
            <div className="acl-ViewRoles animated fadeIn">
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
