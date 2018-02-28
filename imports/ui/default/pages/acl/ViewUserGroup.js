import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
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

class ViewUserGroup extends Component {
    render() {
        const {
            userGroup
        } = this.props;

        return (
            <div className="acl-ViewUserGroup animated fadeIn">
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

ViewUserGroup.defaultProps = {
    userGroup: {}
};

ViewUserGroup.propTypes = {
    userGroup: PropTypes.object
};

export default container((props, onData) => {
    const groupId = props.match.params._id;
    const subscription = Meteor.subscribe('userGroups.detail', groupId);
    if (subscription.ready()) {
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
        onData(null, {
            userGroup: userGroup
        });
    }
}, ViewUserGroup);

