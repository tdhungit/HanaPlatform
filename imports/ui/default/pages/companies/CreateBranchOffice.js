import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';
import BranchOffices from '../../../../collections/BranchOffices/BranchOffices';

class CreateBranchOffice extends Component {
    static viewInfo = {controller: 'BranchOffices', action: 'Create'};

    render() {
        const model = Models.getModel('BranchOffices') || BranchOffices.getLayouts();

        return (
            <div className="CreateBranchOffice animated fadeIn">
                <PT title={t.__("Create new Branch Offices")}/>
                <Row>
                    <Col>
                        <FormComponent
                            title={t.__("Create new Branch Offices")}
                            slogan={t.__("Branch Offices")}
                            model={model}
                            record={{}}
                            method="branchOffices.insert"
                            detailLink="/manager/branch-offices/%s/detail"
                            listLink="/manager/branch-offices"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateBranchOffice;
