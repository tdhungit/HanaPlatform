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
import BranchOffices from '/imports/collections/BranchOffices/BranchOffices';
import Models from '/imports/collections/Models/Models';
import ListComponent from '../models/components/ListComponent';

class ViewBranchOffices extends Component {
    static viewInfo = {controller: 'BranchOffices', action: 'List'};

    componentWillMount() {
        this.limit = BranchOffices.getLimit();
        this.pagination = BranchOffices.pagination();
    }

    render() {
        const {pagination, limit} = this;

        const model = Models.getModel('BranchOffices') || BranchOffices.getLayouts();

        return (
            <div className="ViewBranchOffices animated fadeIn">
                <PT title={t.__('View Branch Offices')}/>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> <T>View Branch Offices</T>
                                <div className="card-actions">
                                    <Link to={'/manager/import/BranchOffices'} title={t.__('Import')}>
                                        <i className="fa fa-file-archive-o"/>
                                    </Link>
                                    <Link to={'/manager/branch-offices/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ListComponent
                                    model={model}
                                    pagination={pagination}
                                    limit={limit}
                                    detailLink="/manager/branch-offices/%s/detail"
                                    editLink="/manager/branch-offices/%s/edit"/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewBranchOffices;
