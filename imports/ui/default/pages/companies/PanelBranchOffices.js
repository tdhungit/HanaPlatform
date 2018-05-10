import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {
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

import BranchOffices from '../../../../collections/BranchOffices/BranchOffices';
import {ListRecordsComponent} from '../models/components/ListComponent';
import Models from '../../../../collections/Models/Models';
import {T} from '../../../../common/Translation';

/**
 * PanelBranchOffices
 * props:
 *  currentBranches
 *  onSelected
 */
export class PanelBranchOffices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectBranchOffice: false,
            selectedBranchOfficeIds: {}
        };

        this.toggleBranchOffice = this.toggleBranchOffice.bind(this);
        this.onSelected = this.onSelected.bind(this);
    }

    componentWillMount() {
        const {currentBranches} = this.props;
        const selectedBranches = currentBranches || Meteor.user().branchOffices || [];
        this.state.selectedBranchOfficeIds = this.convertToObject(selectedBranches);
    }

    convertToObject(selectedBranches) {
        let branchIds = {};
        _.each(selectedBranches, (branchId) => {
             branchIds[branchId] = branchId;
        });

        return branchIds;
    }

    convertToArray(selectedBranches) {
        return _.map(selectedBranches, (branchId, _id) => {
            return _id;
        });
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
        const {onSelected} = this.props;
        const branchOffices = this.convertToArray(this.state.selectedBranchOfficeIds);

        onSelected && onSelected(branchOffices);
        this.setState({selectBranchOffice: false});
    }

    renderPanel(branchOfficeIds) {
        const branchOffices = BranchOffices.find({_id: {$in: branchOfficeIds}}).fetch();
        const {renderPanel} = this.props;
        if (renderPanel) {
            return renderPanel(branchOffices);
        }

        return (
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
        );
    }

    render() {
        const currentBranches = this.convertToArray(this.state.selectedBranchOfficeIds);

        const branchOfficeModel = Models.getModel('BranchOffices') || BranchOffices.getLayouts();
        const branchOfficeIds = [...currentBranches];

        return (
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
                    {this.renderPanel(branchOfficeIds)}
                    {/* select branch offices */}
                    <Modal isOpen={this.state.selectBranchOffice} toggle={this.toggleBranchOffice} className="modal-lg">
                        <ModalHeader toggle={this.toggleBranchOffice}><T>Select</T> <T>Branch Offices</T></ModalHeader>
                        <ModalBody>
                            <ListRecordsComponent
                                type="Select"
                                collection={BranchOffices}
                                filters={{}}
                                model={branchOfficeModel}
                                selected={branchOfficeIds}
                                onClick={(selected) => this.onSelect(selected)}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onSelected}><T>Select</T></Button>{' '}
                            <Button color="secondary" onClick={this.toggleBranchOffice}><T>Cancel</T></Button>
                        </ModalFooter>
                    </Modal>
                </CardBody>
            </Card>
        );
    }
}
