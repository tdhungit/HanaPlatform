import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import Users from '/imports/collections/Users/Users';
import {userLayouts} from '/imports/collections/Users/layouts';
import DetailComponent from '../models/components/DetailComponent';
import BranchOffices from '../../../../collections/BranchOffices/BranchOffices';
import {branchOfficeLayouts} from '../../../../collections/BranchOffices/layouts';
import {ListRecordsComponent} from '../models/components/ListComponent';

class ViewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectBranchOffice: false,
            selectedBranchOfficeIds: {}
        };

        this.toggleBranchOffice = this.toggleBranchOffice.bind(this);
        this.onSelected = this.onSelected.bind(this);
    }

    toggleBranchOffice() {
        this.setState({
            selectBranchOffice: !this.state.selectBranchOffice
        });
    }

    onSelect(selected) {
        this.setState({selectedBranchOfficeIds: selected});
    }

    onSelected() {
        const userId = this.props.match.params._id;
        const branchOffices = $.map(this.state.selectedBranchOfficeIds, function(value, index) {
            return [value];
        });

        Meteor.call('users.updateElement', userId, {branchOffices: branchOffices}, (error, userId) => {
            if (error) {
                console.log(error);
                Bert.alert(error.reason, 'danger');
            }

            this.setState({selectBranchOffice: false});
        });
    }

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
                                    <Button color="link" onClick={this.toggleBranchOffice}>
                                        <i className="fa fa-plus-circle"/>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table bordered hover>
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

                                {/* select branch offices */}
                                <Modal isOpen={this.state.selectBranchOffice} toggle={this.toggleBranchOffice} className="modal-lg">
                                    <ModalHeader toggle={this.toggleBranchOffice}><T>Select</T> <T>Branch Offices</T></ModalHeader>
                                    <ModalBody>
                                        <ListRecordsComponent
                                            type="Select"
                                            collection={BranchOffices}
                                            filters={{}}
                                            model={branchOfficeModel}
                                            selected={user.branchOffices}
                                            onClick={(selected) => this.onSelect(selected)}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.onSelected}><T>Select</T></Button>{' '}
                                        <Button color="secondary" onClick={this.toggleBranchOffice}><T>Cancel</T></Button>
                                    </ModalFooter>
                                </Modal>
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
