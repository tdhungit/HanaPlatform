import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import Users from '/imports/collections/Users/Users';
import FormUser from './FormUser';

class EditUser extends Component {
    render() {
        const {
            user
        } = this.props;

        return (
            <div className="users-EditUser animated fadeIn">
                <PT title={user.username}/>
                <Row>
                    <Col xs="12" lg="12">
                        {user ?
                            <FormUser user={user} title={t.__("Edit user")} slogan={user.username}/>
                            : null}
                    </Col>
                </Row>
            </div>
        );
    }
}

EditUser.defaultProps = {
    user: {}
};

EditUser.propTypes = {
    user: PropTypes.object
};

export default container((props, onData) => {
    const userId = props.match.params._id;
    const subscription = Meteor.subscribe('users.detail', userId);
    if (subscription.ready()) {
        onData(null, {
            user: Users.findOne(userId)
        });
    }
}, EditUser);
