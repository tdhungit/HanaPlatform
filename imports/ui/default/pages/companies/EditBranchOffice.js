import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Alert
} from 'reactstrap';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import BranchOffices from '/imports/collections/BranchOffices/BranchOffices';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';

class EditBranchOffice extends Component {
    static viewInfo = {controller: 'BranchOffices', action: 'Edit'};

    render() {
        const {branchOffice} = this.props;

        if (!branchOffice || !branchOffice._id) {
            return <Alert color="warning"><T>No Data</T></Alert>;
        }

        const model = Models.getModel('BranchOffices') || BranchOffices.getLayouts();

        return (
            <div className="EditBranchOffice animated fadeIn">
                <PT title={branchOffice.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormComponent
                            title={t.__("Edit company")}
                            slogan={branchOffice.name}
                            model={model}
                            record={branchOffice}
                            method="branchOffices.update"
                            detailLink="/manager/branch-offices/%s/detail"
                            listLink="/manager/branch-offices"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const branchOfficeId = props.match.params._id;
    const subscription = Meteor.subscribe('branchOffices.detail', branchOfficeId);
    if (subscription.ready()) {
        onData(null, {
            branchOffice: BranchOffices.findOne(branchOfficeId)
        });
    }
}, EditBranchOffice);
