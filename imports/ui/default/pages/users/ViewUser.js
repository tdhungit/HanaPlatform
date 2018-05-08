import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import Users from '/imports/collections/Users/Users';
import DetailComponent from '../models/components/DetailComponent';
import {UserFieldView} from './fields/UserFields';
import {PanelBranchOffices} from '../companies/PanelBranchOffices';
import {utilsHelper} from '../../helpers/utils/utils';

class ViewUser extends Component {
    static viewInfo = {controller: 'Users', action: 'View'};

    onSelected(selectedBranchOfficeIds) {
        const userId = this.props.match.params._id;
        const data = {
            _id: userId,
            branchOffices: selectedBranchOfficeIds
        };

        Meteor.call('users.update', data, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            }

            this.setState({selectBranchOffice: false});
        });
    }

    render() {
        const {user} = this.props;
        const model = Models.getModel('Users') || Users.getLayouts();

        return (
            <div className="ViewUser animated fadeIn">
                <PT title={t.__('View User') + ': ' + (user && user.username)}/>

                <Row>
                    <Col xs="12" lg="12">
                        <DetailComponent
                            title={t.__('View User')}
                            model={model}
                            record={user}
                            editLink="/manager/users/%s/edit"
                            component={UserFieldView}/>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" lg="12">
                        <PanelBranchOffices
                            currentBranches={user && user.branchOffices}
                            onSelected={(selectedBranchOfficeIds) => this.onSelected(selectedBranchOfficeIds)}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const userId = props.match.params._id;
    Meteor.subscribe('users.detail', userId);
    const user = Users.getOne(userId);
    onData(null, {
        user: user
    });
}, ViewUser);
