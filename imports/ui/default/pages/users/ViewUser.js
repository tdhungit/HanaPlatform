import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import Users from '/imports/collections/Users/Users';
import {userLayouts} from '/imports/collections/Users/layouts';
import DetailComponent from '../models/components/DetailComponent';
import BranchOffices from '../../../../collections/BranchOffices/BranchOffices';
import {branchOfficeLayouts} from '../../../../collections/BranchOffices/layouts';

class ViewUser extends Component {
    render() {
        const {user, branchOffices} = this.props;
        const model = Models.getModel('Users') || userLayouts;
        const branchOfficeModel = Models.getModel('BranchOffices') || branchOfficeLayouts;

        return (
            <div className="ViewUser animated fadeIn">
                <PT title={t.__('View User') + ': ' + user.username}/>

                <Row>
                    <Col xs="12" lg="12">
                        <DetailComponent
                            title={t.__('View User')}
                            model={model}
                            record={user}
                            editLink="/manager/users/%s/edit"/>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className={branchOfficeModel.icon}/>
                                <strong><T>Branch Offices</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/branch-offices/select'} title={t.__('Choose Branch Offices')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th><T>Office Name</T></th>
                                        <th><T>Phone</T></th>
                                        <th><T>Address</T></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {branchOffices.map((branchOffice) => {
                                        return (
                                            <tr key={branchOffice._id}>
                                                <td>{branchOffice.name}</td>
                                                <td>{branchOffice.phone}</td>
                                                <td>{branchOffice.address}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const userId = props.match.params._id;
    const subscription = Meteor.subscribe('users.detail', userId);
    if (subscription.ready()) {
        const user = Users.findOne(userId);
        const branchOfficeIds = user.branchOffices;
        const branchOffices = BranchOffices.find({_id: {$in: branchOfficeIds}}).fetch();
        onData(null, {
            user: user,
            branchOffices: branchOffices
        });
    }
}, ViewUser);
