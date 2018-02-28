import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {T, t, PT} from '/imports/common/Translation';
import FormRole from './FormRole';

class CreateRole extends Component {
    render() {
        return (
            <div className="acl-CreateRole animated fadeIn">
                <PT title={t.__('Create Role')}/>
                <Row>
                    <Col>
                        <FormRole title={t.__('Create Role')} slogan={t.__('ACL')}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateRole;
