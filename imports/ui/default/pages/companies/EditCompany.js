import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Alert
} from 'reactstrap';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import Companies from '/imports/collections/Companies/Companies';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';

class EditCompany extends Component {
    static viewInfo = {controller: 'Companies', action: 'Edit'};

    render() {
        const {company} = this.props;

        if (!company || !company._id) {
            return <Alert color="warning"><T>No Data</T></Alert>;
        }

        const model = Models.getModel('Companies') || Companies.getLayouts();

        return (
            <div className="EditCompany animated fadeIn">
                <PT title={company.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormComponent
                            title={t.__("Edit company")}
                            slogan={company.name}
                            model={model}
                            record={company}
                            method="companies.update"
                            detailLink="/manager/companies/%s/detail"
                            listLink="/manager/companies"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const companyId = props.match.params._id;
    const subscription = Meteor.subscribe('companies.detail', companyId);
    if (subscription.ready()) {
        onData(null, {
            company: Companies.findOne(companyId)
        });
    }
}, EditCompany);