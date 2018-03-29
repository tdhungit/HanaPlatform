import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import BranchOffices from '/imports/collections/BranchOffices/BranchOffices';
import {branchOfficeLayouts} from '/imports/collections/BranchOffices/layouts';
import DetailComponent from '../models/components/DetailComponent';

class ViewBranchOffice extends Component {
    render() {
        const {branchOffice} = this.props;

        const model = Models.getModel('Companies') || branchOfficeLayouts;

        return (
            <div className="ViewBranchOffice animated fadeIn">
                <PT title={t.__('View Branch Office') + ': ' + branchOffice.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <DetailComponent
                            title={t.__('View Branch Office')}
                            model={model}
                            record={branchOffice}
                            editLink="/manager/branch-offices/%s/edit"/>
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
}, ViewBranchOffice);
