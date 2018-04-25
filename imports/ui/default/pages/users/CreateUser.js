import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';
import Users from '../../../../collections/Users/Users';
import Companies from '../../../../collections/Companies/Companies';
import {UserFieldInput} from './fields/UserFields';

class CreateUser extends Component {
    static viewInfo = {controller: 'Users', action: 'Create'};

    constructor(props) {
        super(props);

        this.beforeSave = this.beforeSave.bind(this);
    }

    beforeSave(record) {
        const company = Companies.findOne(Meteor.user().companyId);
        record.companyId = company._id;
        record.branchOffices = [Meteor.user().settings.branchOfficeId];
        record.domain = company.domain;

        return record;
    }

    render() {
        const model = Models.getModel('Users') || Users.getLayouts();
        return (
            <div className="CreateUser animated fadeIn">
                <PT title={t.__("Create new user")}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormComponent
                            title={t.__("Create new user")}
                            slogan={t.__("User for Employee")}
                            model={model}
                            record={{}}
                            beforeSubmit={this.beforeSave}
                            method="users.insert"
                            detailLink="/manager/users/%s/detail"
                            listLink="/manager/users"
                            component={UserFieldInput}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateUser;
