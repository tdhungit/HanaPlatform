import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';
import Companies from '../../../../collections/Companies/Companies';

class CreateCompany extends Component {
    render() {
        const model = Models.getModel('Companies') || Companies.getLayouts();

        return (
            <div className="CreateCompany animated fadeIn">
                <PT title={t.__("Create new company")}/>
                <Row>
                    <Col>
                        <FormComponent
                            title={t.__("Create new company")}
                            slogan={t.__("Service for company")}
                            model={model}
                            record={{}}
                            method="companies.insert"
                            detailLink="/manager/companies/%s/detail"
                            listLink="/manager/companies"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateCompany;
