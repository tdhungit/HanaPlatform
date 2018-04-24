import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import {
    Row,
    Col,
    Alert
} from 'reactstrap';

import Models from '/imports/collections/Models/Models';
import {t, PT} from '/imports/common/Translation';
import FormComponent from '../models/components/FormComponent';
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';
import container from '../../../../common/Container';

class EditRole extends Component {
    static viewInfo = {controller: 'ACL', action: 'Edit'};

    render() {
        const {role} = this.props;

        if (!role || !role._id) {
            return <Alert color="warning"><T>No Data</T></Alert>
        }

        const model = Models.getModel('ACLRoles') || ACLRoles.getLayouts();

        return (
            <div className="users-EditUser animated fadeIn">
                <PT title={role.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormComponent
                            title={t.__("Edit user")}
                            slogan={role.name}
                            model={model}
                            record={role}
                            method="users.update"
                            detailLink="/manager/roles/%s/detail"
                            listLink="/manager/roles"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const roleId = props.match.params._id;
    const subscription = Meteor.subscribe('aclRoles.detail', roleId);
    if (subscription.ready()) {
        onData(null, {
            role: ACLRoles.findOne(roleId)
        });
    }
}, EditRole);
