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
import Companies from '/imports/collections/Companies/Companies';
import Models from '/imports/collections/Models/Models';
import ListComponent from '../models/components/ListComponent';

class ViewCompanies extends Component {
    static viewInfo = {controller: 'Companies', action: 'List'};

    componentWillMount() {
        this.limit = Companies.getLimit();
        this.pagination = Companies.pagination();
    }

    render() {
        const {pagination, limit} = this;
        const model = Models.getModel('Companies') || Companies.getLayouts();

        return (
            <div className="ViewCompanies animated fadeIn">
                <PT title={t.__('View users')}/>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/> <T>View Companies</T>
                                <div className="card-actions">
                                    <Link to={'/manager/companies/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ListComponent
                                    model={model}
                                    pagination={pagination}
                                    limit={limit}
                                    detailLink="/manager/companies/%s/detail"
                                    editLink="/manager/companies/%s/edit"/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewCompanies;
