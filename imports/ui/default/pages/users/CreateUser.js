import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {T, t, PT} from '/imports/common/Translation';
import FormUser from './FormUser';

class CreateUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="users-CreateUser animated fadeIn">
                <PT title={t.__("Create new user")}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormUser title={t.__("Create new user")} slogan={t.__("User for Employee")}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateUser;
