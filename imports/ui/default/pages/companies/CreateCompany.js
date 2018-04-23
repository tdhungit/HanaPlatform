import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row, Col
} from 'reactstrap';

import {t, T, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';
import Companies from '../../../../collections/Companies/Companies';

class CreateCompany extends Component {
    afterSubmit(company) {
        let user = {...company.user};
        user.companyId = company.extra.companyId;
        user.groupId = company.extra.groupId;
        Meteor.call('users.insert', user, (error) => {
            if (error) {
                console.log(error);
                Bert.alert(t.__('Error! Please contact with Admin'), 'danger');
            } else {
                this.props.history.push('/manager/companies/' + company.extra.companyId + '/detail');
            }
        });
    }

    render() {
        const model = Models.getModel('Companies') || Companies.getLayouts();
        let createLayout = model.view.fields;
        createLayout.push({
            'user.username': {
                type: 'text',
                label: 'Admin Username'
            },
            'user.email': {
                type: 'text',
                label: 'Admin Email'
            }
        }, {
            'user.password': {
                type: 'text',
                label: 'Admin Password'
            }
        });

        return (
            <div className="CreateCompany animated fadeIn">
                <PT title={t.__("Create new company")}/>
                <Row>
                    <Col sm="12" lg="12">
                        <FormComponent
                            title={t.__("Create new company")}
                            slogan={t.__("Service for company")}
                            model={model}
                            record={{}}
                            afterSubmit={(record) => this.afterSubmit(record)}
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
