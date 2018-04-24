import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import BranchOffices from '/imports/collections/BranchOffices/BranchOffices';
import DetailComponent from '../models/components/DetailComponent';
import ListComponent from '../models/components/ListComponent';
import Users from '/imports/collections/Users/Users';

/**
 * ViewBranchOffice and Related
 */
class ViewBranchOffice extends Component {
    static viewInfo = {controller: 'BranchOffices', action: 'View'};

    componentWillMount() {
        const branchOfficeId = this.props.match.params._id;
        this.pagination = Users.pagination({
            filters: {
                branchOffices: branchOfficeId
            }
        });
    }

    render() {
        const userModel = Models.getModel('Users') || Users.getLayouts();
        const branchOfficeId = this.props.match.params._id;
        const {pagination} = this;

        return (
            <div className="ViewBranchOffice animated fadeIn">
                <DetailBranchOfficeTag _id={branchOfficeId}/>
                {/*Users related*/}
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className={userModel.icon || 'fa fa-list'}/>
                                <strong>{t.__('Users')}</strong>
                            </CardHeader>
                            <CardBody>
                                <ListComponent
                                    type="Panel"
                                    model={userModel}
                                    pagination={pagination}
                                    limit={20}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewBranchOffice;

/**
 * Detail View Tag
 */
class DetailBranchOffice extends Component {
    render() {
        const {branchOffice} = this.props;
        const model = Models.getModel('BranchOffices') || BranchOffices.getLayouts();

        return (
            <Row>
                <PT title={t.__('View Branch Office') + ': ' + branchOffice.name}/>
                <Col xs="12" lg="12">
                    <DetailComponent
                        title={t.__('View Branch Office')}
                        model={model}
                        record={branchOffice}
                        editLink="/manager/branch-offices/%s/edit"/>
                </Col>
            </Row>
        );
    }
}

const DetailBranchOfficeTag = container((props, onData) => {
    const branchOfficeId = props._id;
    const subscription = Meteor.subscribe('branchOffices.detail', branchOfficeId);
    if (subscription.ready()) {
        onData(null, {
            branchOffice: BranchOffices.findOne(branchOfficeId)
        });
    }
}, DetailBranchOffice);
