import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import Users from '/imports/collections/Users/Users';
import {userLayouts} from '/imports/collections/Users/layouts';
import DetailComponent from '../models/components/DetailComponent';

class ViewUser extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    render() {
        const {user} = this.props;

        const model = Models.getModel('Users') || userLayouts;

        return (
            <div className="ViewUser animated fadeIn">
                <PT title={t.__('View User') + ': ' + user.username}/>
                <Row>
                    <Col xs="12" lg="12">
                        <DetailComponent
                            title={t.__('View User')}
                            model={model}
                            record={user}
                            editLink="/manager/users/%s/edit"/>
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
            user: Users.findOne(userId)
        });
    }
}, ViewUser);
