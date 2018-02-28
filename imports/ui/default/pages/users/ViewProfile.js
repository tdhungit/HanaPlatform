import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Input,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import classnames from 'classnames';
import {Bert} from 'meteor/themeteorchef:bert';

import {T, t, PT} from '/imports/common/Translation';
import Media from '/imports/collections/Media/Media';
import {ImageTag} from '../../helpers/tags/MediaImage';
import {utilsHelper} from '../../helpers/utils/utils';
import UserActivities from './UserActivities';
import UserTimeline from './UserTimeline';
import ProfileUserInfo from './ProfileUserInfo';
import UserSettings from './UserSettings';

class ViewProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'activities',
            avatar: '',
            avatarUploading: false,
            user: {}
        };

        this.toggle = this.toggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getProfile(field) {
        const currentUser = Meteor.user();
        return utilsHelper.getField(currentUser, field, '--');
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let user = this.state.user;
        user[name] = value;

        this.setState({user: user});
    }

    handleChangeAvatar(event) {
        const target = event.target;
        const file = target.files && target.files[0];
        if (file) {
            const uploadInstance = Media.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
            uploadInstance.on('start', () => {
                this.setState({avatarUploading: true});
            });
            uploadInstance.on('end', (error, fileObj) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    const userId = Meteor.userId();
                    Meteor.call('users.updateAvatar', userId, fileObj._id, (error) => {
                        if (error) {
                            Bert.alert(error.reason, 'danger');
                        } else {
                            Bert.alert(t.__('Successful!'), 'success');
                        }
                    });
                }
                this.setState({avatarUploading: false});
            });
            uploadInstance.start();
        }
    }

    render() {
        const currentUser = Meteor.user();

        return (
            <div className="users-ViewProfile animated fadeIn">
                <PT title={t.__('My Profile')}/>
                <Row>
                    <Col xs="12" md="3" className="mb-3">
                        <Card>
                            <CardBody>
                                <div className="profileAvatar">
                                    <ImageTag media={this.getProfile('profile.avatar')}
                                              className="rounded img-profile" alt={currentUser.username}/>
                                    <div className="upload">
                                        <Button type="button" size="sm">
                                            {this.state.avatarUploading ? <i className="fa fa-spin fa-spinner"/> : null}&nbsp;
                                            <i className="fa fa-upload"/> <T>Edit</T>
                                        </Button>
                                        <Input type="file" name="avatar" className="file"
                                               onChange={this.handleChangeAvatar}/>
                                    </div>
                                </div>
                                <h3 className="text-center">
                                    {this.getProfile('profile.firstName')} {this.getProfile('profile.lastName')}
                                </h3>
                                <p className="text-center">{currentUser.emails[0].address}</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" md="9" className="mb-9">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'activities'})}
                                    onClick={() => {
                                        this.toggle('activities');
                                    }}>
                                    <T>Activities</T>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'timeline'})}
                                    onClick={() => {
                                        this.toggle('timeline');
                                    }}>
                                    <T>Timeline</T>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'userinfo'})}
                                    onClick={() => {
                                        this.toggle('userinfo');
                                    }}>
                                    <T>User Info</T>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === 'settings'})}
                                    onClick={() => {
                                        this.toggle('settings');
                                    }}>
                                    <T>Settings</T>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="activities">
                                <UserActivities/>
                            </TabPane>
                            <TabPane tabId="timeline">
                                <UserTimeline/>
                            </TabPane>
                            <TabPane tabId="userinfo">
                                <ProfileUserInfo/>
                            </TabPane>
                            <TabPane tabId="settings">
                                <UserSettings {...this.props}/>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewProfile;
