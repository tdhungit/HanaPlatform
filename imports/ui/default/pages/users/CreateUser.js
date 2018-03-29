import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import {userLayouts} from '/imports/collections/Users/layouts';
import FormComponent from '../models/components/FormComponent';

class CreateUser extends Component {
    render() {
        const model = Models.getModel('Users') || userLayouts;
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
                            method="users.insert"
                            detailLink="/manager/users/%s/detail"
                            listLink="/manager/users"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateUser;
