import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import FormUserGroup from './FormUserGroup';
import UserGroups from '/imports/collections/UserGroups/UserGroups';

class EditUserGroup extends Component {
    render() {
        const {
            userGroup
        } = this.props;

        return (
            <div className="acl-EditUserGroup animated fadeIn">
                <PT title={userGroup.name}/>
                <Row>
                    <Col>
                        <FormUserGroup userGroup={userGroup} title={t.__('Edit')} slogan={userGroup.name}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

EditUserGroup.defaultProps = {
    userGroup: {}
};

EditUserGroup.propTypes = {
    userGroup: PropTypes.object
};

export default container((props, onData) => {
    const groupId = props.match.params._id;
    const subscription = Meteor.subscribe('userGroups.detail', groupId);
    if (subscription && subscription.ready()) {
        onData(null, {
            userGroup: UserGroups.findOne(groupId)
        });
    }
}, EditUserGroup);
