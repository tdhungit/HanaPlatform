import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import UserGroups from '/imports/collections/UserGroups/UserGroups';
import ACLRoles from '../../../../collections/ACLRoles/ACLRoles';

class ViewUserGroup extends Component {
    static viewInfo = {controller: 'UserGroups', action: 'View'};

    render() {
        const {
            userGroup,
            role
        } = this.props;

        return (
            <div className="ViewUserGroup animated fadeIn">
                <PT title={userGroup.name}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-eye"></i>
                                <strong><T>View User Group</T></strong>&nbsp;
                                {userGroup.name}
                                <div className="card-actions">
                                    <Link to={'/manager/user-groups/' + userGroup._id + '/edit'} title={t.__('Edit')}>
                                        <i className="fa fa-edit"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody className="detail">
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Name</T></dt>
                                    <dd className="col-sm-9">{userGroup.name}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Description</T></dt>
                                    <dd className="col-sm-9">{userGroup.description}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Parent</T></dt>
                                    <dd className="col-sm-9">{userGroup.parentObject.name}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Role</T></dt>
                                    <dd className="col-sm-9">{role && role.name || 'N/A'}</dd>
                                </dl>
                            </CardBody>
                        </Card>
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
        let userGroup = UserGroups.findOne(groupId);
        userGroup.parentObject = {};
        if (!userGroup.parent || userGroup.parent == 'ROOT') {
            userGroup.parentObject = {
                _id: 0,
                name: 'ROOT'
            };
        } else {
            const parent = UserGroups.findOne(userGroup.parent);
            userGroup.parentObject = {
                _id: parent._id,
                name: parent.name
            };
        }

        let role = {};
        if (userGroup.roleId) {
            role = ACLRoles.findOne(userGroup.roleId);
        }

        onData(null, {
            userGroup: userGroup,
            role: role
        });
    }
}, ViewUserGroup);

