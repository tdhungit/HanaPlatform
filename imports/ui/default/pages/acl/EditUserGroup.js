import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import FormUserGroup from './FormUserGroup';
import UserGroups from '/imports/collections/UserGroups/UserGroups';
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';

class EditUserGroup extends Component {
    static viewInfo = {controller: 'UserGroups', action: 'Edit'};

    render() {
        const {
            userGroup,
            aclRoles
        } = this.props;

        return (
            <div className="EditUserGroup animated fadeIn">
                <PT title={userGroup.name}/>
                <Row>
                    <Col>
                        <FormUserGroup userGroup={userGroup}
                                       aclRoles={aclRoles}
                                       title={t.__('Edit')}
                                       slogan={userGroup.name}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const groupId = props.match.params._id;
    const groupSub = Meteor.subscribe('userGroups.detail', groupId);
    const rolesSub = Meteor.subscribe('aclRoles.list');
    if (groupSub.ready() && rolesSub.ready()) {
        onData(null, {
            userGroup: UserGroups.findOne(groupId),
            aclRoles: ACLRoles.find().fetch()
        });
    }
}, EditUserGroup);
