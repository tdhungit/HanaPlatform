import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Alert
} from 'reactstrap';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import Users from '/imports/collections/Users/Users';
import {userLayouts} from '/imports/collections/Users/layouts';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';

class EditUser extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    render() {
        const {user} = this.props;

        if (!user || !user._id) {
            return <Alert color="warning"><T>No Data</T></Alert>;
        }

        const model = Models.getModel('Users') || userLayouts;

        return (
            <div className="EditUser animated fadeIn">
                <PT title={user.username}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormComponent
                            title={t.__("Edit user")}
                            slogan={user.username}
                            model={model}
                            record={user}
                            method="users.update"
                            detailLink="/manager/users/%s/detail"
                            listLink="/manager/users"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const userId = props.match.params._id;
    const subscription = Meteor.subscribe('users.detail', userId);
    if (subscription.ready()) {
        onData(null, {
            user: Users.getOne(userId)
        });
    }
}, EditUser);
