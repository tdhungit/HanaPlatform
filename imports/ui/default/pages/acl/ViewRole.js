import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import DetailComponent from '../models/components/DetailComponent';
import Models from '/imports/collections/Models/Models';
import {aclRoleLayouts} from '/imports/collections/ACLRoles/layouts';
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';
import container from '/imports/common/Container';

class ViewRole extends Component {
    render() {
        const {role} = this.props;

        const model = Models.getModel('Users') || aclRoleLayouts;

        return (
            <div className="acl-ViewRole animated fadeIn">
                <PT title={t.__('View Role') + ': ' + role.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <DetailComponent
                            title={t.__('View Role')}
                            model={model}
                            record={role}
                            editLink="/manager/roles/%s/edit"/>
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
}, ViewRole);
