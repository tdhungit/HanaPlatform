import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Row, Col,
    Card, CardHeader, CardBody, CardFooter,
    Button, Input, Label, Badge,
    ListGroup, ListGroupItem,
    FormGroup, InputGroup, InputGroupAddon,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import _ from 'underscore';

import {T, t} from '/imports/common/Translation';
import {AppListStrings} from '/imports/common/AppListStrings';
import {SelectHelper, Select2Helper, SelectGroupHelper} from '../../helpers/inputs/SelectHelper';
import {DateInput} from '../../helpers/inputs/DateHelper';
import {ImageTag} from '../../helpers/tags/MediaImage';
import {TextEditor} from '../../helpers/inputs/TextEditor';
import {utilsHelper} from '../../helpers/utils/utils';

class FormActivity extends Component {
    static defaultProps = {
        title: '',
        slogan: '',
        activity: {}
    };

    static propTypes = {
        title: PropTypes.string,
        slogan: PropTypes.string,
        activity: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            activity: {
                invites: {},
                notifications: []
            },
            inviting: '',
            conferencingList: [],
            showRepeat: false,
        };

        this.loadInviteUsers = this.loadInviteUsers.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeNotification = this.changeNotification.bind(this);
    }

    componentWillMount() {
        if (this.props.activity) {
            let activity = this.props.activity;
            let invites = {};
            if (activity.invites) {
                for (let idx in activity.invites) {
                    let invite = activity.invites[idx];
                    invites[invite.userId] = invite;
                }
            }

            activity.invites = invites;
            this.state.activity = activity;
        }

        for (let idx in AppListStrings.ConferencingList) {
            let conferencing = AppListStrings.ConferencingList[idx];
            this.state.conferencingList[conferencing] = {
                label: conferencing,
                value: conferencing
            };
        }
    }

    handleInputChange(event) {
        let activity = utilsHelper.inputChange(event, this.state.activity);
        if (event.target.name === 'conferencing') {
            activity.conferencing = {
                type: event.target.value.selected,
                name: event.target.value.text
            };
        }

        this.setState({activity: activity});
    }

    getInputValue(name, defaultValue = '') {
        if (name === 'conferencing') {
            if (this.state.activity.conferencing) {
                const conferencing = this.state.activity.conferencing;
                if (conferencing.type && conferencing.name) {
                    return {
                        selected: conferencing.type,
                        text: conferencing.name
                    };
                }
            }

            return {
                selected: '',
                text: ''
            }
        }

        return utilsHelper.getField(this.state.activity, name, defaultValue);
    }

    loadInviteUsers(input, callback) {
        Meteor.call('users.searchKeyword', input, 5, (error, response) => {
            let options = [];
            if (!error) {
                for (let idx in response) {
                    let user = response[idx];
                    options.push({
                        value: user._id,
                        label: user.username,
                        media: user.profile && user.profile.avatar ? user.profile.avatar : '',
                        user: user
                    });
                }
            }
            callback(null, {
                options: options
            });
        });
    }

    inviteUser(event) {
        let activity = this.state.activity;
        let invites = activity.invites;
        const user = event.selectedOption && event.selectedOption.user || false;

        if (user) {
            invites[event.selectedOption.value] = {
                userId: event.selectedOption.value,
                username: event.selectedOption.label,
                userEmail: user.emails && user.emails[0].address,
                media: user.profile && user.profile.avatar ? user.profile.avatar : '',
                canEdit: false,
                canInvite: false,
                canSeeAll: false
            };

            activity.invites = invites;
            this.setState({
                inviting: event.selectedOption.value,
                activity: activity
            });
        }
    }

    removeInviteUser(userId) {
        let invites = this.state.invites;
        if (invites[userId]) {
            delete invites[userId];
        }
        this.setState({
            inviting: '',
            invites: invites
        });
    }

    renderInviteUsers() {
        let indents = [];
        for (let userId in this.state.activity.invites) {
            let invite = this.state.activity.invites[userId];
            indents.push((
                <ListGroupItem key={userId} className="justify-content-between inviteUser">
                    <ImageTag media={invite.media ? invite.media : ''}
                              style={{width: 24, height: 24}}/> {invite.username}
                    <Badge href="javascript:void(0)" className="pull-right" color="default"
                           onClick={this.removeInviteUser.bind(this, userId)}>
                        <i className="fa fa-remove"/>
                    </Badge>
                    <div className="inviteOption">
                        <FormGroup check>
                            <Input className="form-check-input" type="checkbox"
                                   checked={this.state.activity.invites[userId].canEdit || false}
                                   id={'canEdit' + userId} name={'invites.' + userId + '.canEdit'}
                                   onChange={this.handleInputChange}/>
                            <Label className="form-check-label" htmlFor={'canEdit.' + userId}><T>Can edit
                                event</T></Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input className="form-check-input" type="checkbox"
                                   checked={this.state.activity.invites[userId].canInvite || false}
                                   id={'canInvite' + userId} name={'invites.' + userId + '.canInvite'}
                                   onChange={this.handleInputChange}/>
                            <Label className="form-check-label" htmlFor={'canInvite.' + userId}><T>Can invite more
                                users</T></Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input className="form-check-input" type="checkbox"
                                   checked={this.state.activity.invites[userId].canSeeAll || false}
                                   id={'canSeeAll' + userId} name={'invites.' + userId + '.canSeeAll'}
                                   onChange={this.handleInputChange}/>
                            <Label className="form-check-label" htmlFor={'canSeeAll.' + userId}><T>Can see all invite
                                users</T></Label>
                        </FormGroup>
                    </div>
                </ListGroupItem>
            ))
        }
        return indents;
    }

    addNotification() {
        let activity = this.state.activity;
        if (!activity.notifications) {
            activity.notifications = [];
        }

        const notification = {
            type: 'Email',
            duration: 30,
            unit: 'minutes'
        };

        activity.notifications.push(notification);
        this.setState({activity: activity});
    }

    changeNotification(event) {
        const target = event.target;
        const nameArray = target.name.split('.');
        const name = nameArray[0];
        const idx = parseInt(nameArray[1]);
        const value = target.value;

        let activity = this.state.activity;
        if (!activity.notifications[idx]) {
            activity.notifications[idx] = {};
        }

        activity.notifications[idx][name] = value;
        this.setState({activity: activity});
    }

    removeNotification(idx) {
        let activity = this.state.activity;
        delete activity.notifications[idx];
        this.setState({activity: activity});
    }

    renderNotifications() {
        let notifications = [];
        for (let idx in this.state.activity.notifications) {
            let notification = this.state.activity.notifications[idx];
            notifications.push(
                <InputGroup key={idx} className="notificationItem">
                    <InputGroupAddon addonType="prepend">
                        <ButtonDropdown isOpen={this.state['notifyType' + idx]}
                                        toggle={() => {
                                            this.setState({['notifyType' + idx]: !this.state['notifyType' + idx]});
                                        }}>
                            <DropdownToggle caret color="gray-200">{notification.type}</DropdownToggle>
                            <DropdownMenu className={this.state['notifyType' + idx] ? "show" : ""}>
                                <DropdownItem name={'type.' + idx} value="Email"
                                              onClick={this.changeNotification}>Email</DropdownItem>
                                <DropdownItem name={'type.' + idx} value="Notification"
                                              onClick={this.changeNotification}>Notification</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </InputGroupAddon>
                    <Input type="text" name={'duration.' + idx} value={notification.duration} idx={idx}
                           onChange={this.changeNotification}/>
                    <InputGroupAddon addonType="prepend">
                        <ButtonDropdown isOpen={this.state['notifyUnit' + idx]}
                                        toggle={() => {
                                            this.setState({['notifyUnit' + idx]: !this.state['notifyUnit' + idx]});
                                        }}>
                            <DropdownToggle caret color="gray-200">{notification.unit}</DropdownToggle>
                            <DropdownMenu className={this.state['notifyUnit' + idx] ? "show" : ""}>
                                <DropdownItem name={'unit.' + idx} value="minutes"
                                              onClick={this.changeNotification}>minutes</DropdownItem>
                                <DropdownItem name={'unit.' + idx} value="hours"
                                              onClick={this.changeNotification}>hours</DropdownItem>
                                <DropdownItem name={'unit.' + idx} value="days"
                                              onClick={this.changeNotification}>days</DropdownItem>
                                <DropdownItem name={'unit.' + idx} value="weeks"
                                              onClick={this.changeNotification}>weeks</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </InputGroupAddon>
                    <Button type="button" color="default" onClick={() => this.removeNotification(idx)}><i
                        className="fa fa-remove"/></Button>
                </InputGroup>
            );
        }

        return notifications;
    }

    renderRepeat() {
        const days = [
            {value: 0, label: 'S'},
            {value: 1, label: 'M'},
            {value: 2, label: 'T'},
            {value: 3, label: 'W'},
            {value: 4, label: 'T'},
            {value: 5, label: 'F'},
            {value: 6, label: 'S'},
        ];

        let enable = this.state.activity.repeat
            && this.state.activity.repeat.enable
            || false;
        if (this.state.activity.repeat
            && this.state.activity.repeat.dayOfWeek
            && this.state.activity.repeat.dayOfWeek.length >= 0) {
            enable = true;
        }

        return (
            <Modal isOpen={this.state.showRepeat}
                   toggle={() => this.setState({showRepeat: true})}>
                <ModalHeader toggle={() => this.setState({showRepeat: false})}>
                    <T>Repeat Setting</T>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Col lg="3"><Label><T>Enable</T></Label></Col>
                                <Col lg="9">
                                    <Label className="switch switch-3d switch-primary">
                                        <Input type="checkbox"
                                               className="switch-input"
                                               checked={enable}
                                               name="repeat.enable"
                                               onChange={() => {
                                                   let activity = {...this.state.activity};
                                                   if (!activity.repeat) {
                                                       activity.repeat = {};
                                                   }

                                                   activity.repeat.enable = !enable;
                                                   if (activity.repeat.enable === false) {
                                                       activity.repeat = {enable: false};
                                                   } else {
                                                       if (!activity.repeat.duration) {
                                                           activity.repeat.duration = 1;
                                                       }

                                                       if (!activity.repeat.unit) {
                                                           activity.repeat.unit = 'weeks';
                                                       }
                                                   }

                                                   this.setState({activity});
                                               }}/>
                                        <span className="switch-label"/>
                                        <span className="switch-handle"/>
                                    </Label>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <div style={{display: enable ? 'block': 'none'}}>
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Col lg="3"><Label><T>All days</T></Label></Col>
                                    <Col lg="9">
                                        <Label className="switch switch-3d switch-primary">
                                            <Input type="checkbox"
                                                   className="switch-input"
                                                   checked={this.getInputValue('allDay', false)}
                                                   name="allDay"
                                                   onChange={this.handleInputChange}/>
                                            <span className="switch-label"/>
                                            <span className="switch-handle"/>
                                        </Label>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div>
                            <Row>
                                <Col>
                                    <FormGroup row>
                                        <Col lg="3"><Label><T>Start</T></Label></Col>
                                        <Col lg="9">
                                            <DateInput
                                                type='time'
                                                name='repeat.start'
                                                value={this.getInputValue('repeat.start')}
                                                onChange={this.handleInputChange}/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup row>
                                        <Col lg="3"><Label><T>End</T></Label></Col>
                                        <Col lg="9">
                                            <DateInput
                                                type='time'
                                                name='repeat.end'
                                                value={this.getInputValue('repeat.end')}
                                                onChange={this.handleInputChange}/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Col lg="3"><Label><T>Repeat every</T></Label></Col>
                                    <Col lg="3">
                                        <Input type="number"
                                               name="repeat.duration"
                                               value={this.getInputValue('repeat.duration', 1)}
                                               onChange={this.handleInputChange}/>
                                    </Col>
                                    <Col lg="3">
                                        <SelectHelper
                                            name="repeat.unit"
                                            options={[
                                                'days',
                                                'weeks',
                                                'months',
                                                'years'
                                            ]}
                                            required={true}
                                            value={this.getInputValue('repeat.unit', 'weeks')}
                                            onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Col lg="3">
                                        <Label><T>Repeat days</T></Label>
                                    </Col>
                                    <Col lg="9">
                                        {days.map((day, i) => {
                                            let color = 'gray-200';
                                            let outline = true;
                                            if (this.state.activity.repeat && this.state.activity.repeat.dayOfWeek) {
                                                const cDIdx = _.indexOf(this.state.activity.repeat.dayOfWeek, day.value);
                                                if (cDIdx >= 0) {
                                                    color = 'info';
                                                    outline = false;
                                                }
                                            }

                                            return (
                                                <Button key={i}
                                                        outline={outline}
                                                        size="sm"
                                                        color={color}
                                                        style={{marginRight: 2}}
                                                        onClick={() => {
                                                            let activity = {...this.state.activity};
                                                            if (!activity.repeat) {
                                                                activity.repeat = {};
                                                            }

                                                            if (!activity.repeat.dayOfWeek) {
                                                                activity.repeat.dayOfWeek = [];
                                                            }

                                                            const pos = _.indexOf(activity.repeat.dayOfWeek, day.value);
                                                            if (pos >= 0) {
                                                                activity.repeat.dayOfWeek.splice(pos, 1);
                                                            } else {
                                                                activity.repeat.dayOfWeek.push(day.value);
                                                            }

                                                            this.setState({activity});
                                                        }}>
                                                    {day.label}
                                                </Button>
                                            );
                                        })}
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            onClick={() => this.setState({showRepeat: false})}>
                        <i className="fa fa-check-circle"/> <T>Done</T>
                    </Button>
                    <Button color="secondary"
                            onClick={() => this.setState({showRepeat: false})}>
                        <i className="fa fa-ban"/> <T>Cancel</T>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    onCancel(isEdit) {
        const {onCancel} = this.props;
        if (onCancel) {
            onCancel();
        } else {
            if (isEdit) {
                const path = '/manager/activities/' + this.state.activity._id + '/detail';
                this.props.history.push(path);
            } else {
                this.props.history.push('/manager/activities');
            }
        }
    }

    handleSubmit() {
        let activity = {...this.state.activity};

        activity.dateStart = utilsHelper.toDatetimeDb(activity.dateStart);
        activity.dateEnd = utilsHelper.toDatetimeDb(activity.dateEnd);

        if (activity.repeat) {
            if (activity.repeat.start) {
                activity.repeat.start = activity.repeat.start.format('HH:mm');
            }

            if (activity.repeat.end) {
                activity.repeat.end = activity.repeat.end.format('HH:mm');
            }
        }

        if (activity.invites.constructor !== 'Array') {
            activity.invites = Object.keys(activity.invites).map(item => activity.invites[item]);
        }

        const existing = this.props.activity && this.props.activity._id;
        const method = existing ? 'activities.update' : 'activities.insert';

        Meteor.call(method, activity, (error, activityId) => {
            utilsHelper.alertSystem(error);
            if (!error) {
                this.setState({activity: {}});
                const {onSubmit} = this.props;
                if (onSubmit) {
                    onSubmit(activity);
                } else {
                    this.props.history.push('/manager/activities/' + activityId + '/detail');
                }
            }
        });
    }

    render() {
        const existing = this.props.activity && this.props.activity._id;
        const {title, slogan} = this.props;

        return (
            <Card>
                {title ?
                    <CardHeader>
                        <i className="fa fa-tasks"/>
                        <strong>{title}</strong> {slogan}
                    </CardHeader> : null}
                <CardBody>
                    <Row>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Subject</T></Label>
                                <Input type="text" name="name"
                                       placeholder={t.__('Enter here')}
                                       value={this.getInputValue('name')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Type</T></Label>
                                <SelectHelper name="type"
                                              placeholder={t.__('Choose...')}
                                              options={AppListStrings.ActivityTypes}
                                              value={this.getInputValue('type')}
                                              onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Button type="button"
                                        color="gray-200"
                                        onClick={() => this.setState({showRepeat: true})}>
                                    <i className="icon-reload"/> <T>Repeat</T>
                                </Button>
                                {this.renderRepeat()}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Date start</T></Label>
                                <DateInput
                                    type="datetime"
                                    name="dateStart"
                                    value={this.getInputValue('dateStart')}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Date end</T></Label>
                                <DateInput
                                    type="datetime"
                                    name="dateEnd"
                                    value={this.getInputValue('dateEnd')}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="8">
                            <FormGroup>
                                <Label><T>Location</T></Label>
                                <Input type="text"
                                       name="location"
                                       placeholder={t.__('Enter here')}
                                       value={this.getInputValue('location')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label><T>Conferencing</T></Label>
                                <SelectGroupHelper
                                    name="conferencing"
                                    icon="icon-speech"
                                    label={t.__('Add Conferencing')}
                                    placeholder={t.__('Conferencing')}
                                    items={this.state.conferencingList}
                                    value={this.getInputValue('conferencing')}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="button"
                                        color="gray-200"
                                        onClick={this.addNotification.bind(this)}>
                                    <i className="icon-bell"/> <T>Add Notification</T>
                                </Button>
                                <div className="activityNotifications">
                                    {this.renderNotifications()}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label><T>Description</T></Label>
                                <TextEditor
                                    name="description"
                                    placeholder={t.__('Enter here')}
                                    value={this.getInputValue('description')}
                                    onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label><T>Invites</T></Label>
                                <Select2Helper
                                    name="invites"
                                    placeholder={t.__('Choose...')}
                                    value={this.state.inviting}
                                    async={true}
                                    loadOptions={this.loadInviteUsers}
                                    imgOption={true}
                                    onChange={this.inviteUser.bind(this)}/>
                            </FormGroup>
                            <ListGroup className="inviteUsers">
                                {this.renderInviteUsers()}
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"/>&nbsp;
                        {existing ? <T>Update</T> : <T>Create</T>}
                    </Button>
                    {existing
                        ? <Button type="button"
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.onCancel(true)}>
                            <i className="fa fa-ban"/> <T>Cancel</T>
                        </Button>
                        : <Button type="button"
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.onCancel(false)}>
                            <i className="fa fa-ban"/> <T>Cancel</T>
                        </Button>}
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(FormActivity);
