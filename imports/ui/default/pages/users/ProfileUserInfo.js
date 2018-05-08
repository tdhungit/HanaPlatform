import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Input,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import classnames from 'classnames';

import {T, t} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';

class ProfileUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            user: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const currentUser = Meteor.user();
        let user = currentUser;
        user.username = currentUser.username;
        user.email = currentUser.emails && currentUser.emails[0].address;

        this.state.user = user;
    }

    getUserField(field) {
        return utilsHelper.getField(this.state.user, field);
    }

    handleInputChange(event) {
        const user = utilsHelper.inputChange(event, this.state.user);
        this.setState({user: user});
    }

    saveUserInfo() {
        Meteor.call('users.update', this.state.user, (error, userId) => {
            utilsHelper.alertSystem(error);
            if (!error) {
                this.setState({showEdit: false});
            }
        });
    }

    render() {
        return (
            <div className="ProfileUserInfo">
                <div className={classnames({'detail': true, hide: this.state.showEdit})}>
                    <dl className="row">
                        <dt className="col-sm-2"><T>Username</T></dt>
                        <dd className="col-sm-4">{this.getUserField('username')}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-2"><T>Email</T></dt>
                        <dd className="col-sm-4">{this.getUserField('email')}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-2"><T>First name</T></dt>
                        <dd className="col-sm-4">{this.getUserField('profile.firstName')}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-2"><T>Last name</T></dt>
                        <dd className="col-sm-4">{this.getUserField('profile.lastName')}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-2"> </dt>
                        <dd className="col-sm-4">
                            <Button type="button" size="sm" color="warning"
                                    onClick={() => this.setState({showEdit: true})}><T>Edit</T></Button>
                        </dd>
                    </dl>
                </div>
                <div className={classnames({edit: true, hide: !this.state.showEdit})}>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Col md="3">
                                    <Label><T>Username</T></Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text" name="username" value={this.getUserField('username')}
                                           onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Col md="3">
                                    <Label><T>Email</T></Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text" name="email" value={this.getUserField('email')}
                                           onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Col md="3">
                                    <Label><T>First name</T></Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text" name="profile.firstName" value={this.getUserField('profile.firstName')}
                                           onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Col md="3">
                                    <Label><T>Last name</T></Label>
                                </Col>
                                <Col md="9">
                                    <Input type="text" name="profile.lastName" value={this.getUserField('profile.lastName')}
                                           onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3"> </Col>
                        <Col md="9">
                            <Button type="button" size="sm" color="primary"
                                    onClick={this.saveUserInfo.bind(this)}><T>Save</T></Button>
                            <Button type="button" size="sm" color="default"
                                    onClick={() => this.setState({showEdit: false})}><T>Cancel</T></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileUserInfo);
