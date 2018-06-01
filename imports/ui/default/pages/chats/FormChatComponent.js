import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import {
    Button, Input,
    FormGroup, InputGroup, InputGroupAddon,
    ButtonGroup,
    Alert
} from 'reactstrap';
import 'react-chat-elements/dist/main.css';
import {MessageList} from 'react-chat-elements';

import {t, T} from '../../../../common/Translation';
import container from '../../../../common/Container';
import ChatMessages from '../../../../collections/ChatMessages/ChatMessages';
import Users from '../../../../collections/Users/Users';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';
import Medias from '../../../../collections/Medias/Medias';
import {utilsHelper} from '../../helpers/utils/utils';
import {UsersModal} from '../../helpers/tags/UsersModal';
import {ChatChannelUserStatus} from '../../../../collections/ChatChannels/config';

class FormChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedInvites: {},
            chat: {},
            messagesHeight: 0,
            showInvite: false
        };

        this.changeChatInfo = this.changeChatInfo.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleMessageKeyPress = this.handleMessageKeyPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {channel} = nextProps;
        let selectedUsers = {};
        _.each(channel.users, (inviteUser) => {
            selectedUsers[inviteUser._id] = {
                _id: inviteUser._id,
                username: inviteUser.username
            };
        });

        this.setState({selectedInvites: selectedUsers});
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        this.props.onRef && this.props.onRef(undefined);

        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({messagesHeight: window.innerHeight - 330});
    }

    changeChatInfo(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let chat = {...this.state.chat};
        chat[name] = value;
        this.setState({chat});
    }

    handleMessageKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        let chat = {...this.state.chat};
        chat.channelId = this.props.channelId;
        if (chat.message) {
            Meteor.call('chatMessages.insert', chat, (error) => {
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    this.setState({chat: {}});
                }
            });
        }
    }

    sendInvite(invites) {
        const {channelId} = this.props;
        if (channelId) {
            if (invites.constructor !== 'Array') {
                invites = Object.keys(invites).map(item => invites[item]);
            }

            Meteor.call('chatChannels.invite', channelId, invites, (error) => {
                utilsHelper.alertSystem(error);
                if (!error) {
                    this.setState({showInvite: false});
                }
            });
        }
    }

    joinChat() {
        const {channelId, channel} = this.props;
        if (channelId) {
            let data = {_id: channelId};
            data.users = channel.users;
            const pos = _.findIndex(data.users, {_id: Meteor.userId()});
            if (pos >= 0) {
                data.users[pos].status = 'Active';
                Meteor.call('chatChannels.update', data, (error) => {
                    utilsHelper.alertSystem(error);
                });
            }
        }
    }

    getChatSources() {
        const {chats} = this.props;
        let sources = [];

        _.each(chats, (chat) => {
            let position = 'right';
            if (chat.userId === Meteor.userId()) {
                position = 'left';
            }

            sources.push({
                position: position,
                type: chat.type || 'text',
                title: chat.user && chat.user.username,
                avatar: chat.avatar,
                text: chat.message,
                dateString: utilsHelper.toDateTimeDisplay(chat.createdAt),
            });
        });

        return sources;
    }

    // render
    renderChatMessages() {
        const {messagesHeight} = this.props;
        const dataSources = this.getChatSources();

        return (
            <div style={{height: messagesHeight || this.state.messagesHeight}}>
                <MessageList
                    className="messages"
                    lockable={true}
                    toBottomHeight="100%"
                    dataSource={dataSources}/>
            </div>
        );
    }

    // render
    renderFullForm() {
        return (
            <div className="inboxContent">
                <div className="messageContent">
                    <div className="toolbar">
                        <ButtonGroup>
                            <Button type="button"
                                    color="light"
                                    onClick={() => this.setState({showInvite: true})}>
                                <i className="fa fa-user-plus"/>
                            </Button>
                            <Button type="button" color="light">
                                <i className="fa fa-cogs"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <UsersModal
                        isOpen={this.state.showInvite}
                        mdToggle={() => this.setState({showInvite: false})}
                        selected={this.state.selectedInvites}
                        onChange={(selectedInvites) => this.setState({selectedInvites})}
                        onOk={(invites) => this.sendInvite(invites)}/>
                    {this.renderChatMessages()}
                </div>
                <FormGroup className="messageInput">
                    <div className="controls">
                        <InputGroup>
                            <Input type="text"
                                   name="message"
                                   value={this.state.chat.message || ''}
                                   placeholder={t.__('Enter Message')}
                                   onChange={this.changeChatInfo}
                                   onKeyPress={this.handleMessageKeyPress}/>
                            <InputGroupAddon addonType="append">
                                <Button type="button" color="primary"
                                        onClick={() => this.sendMessage()}>
                                    <i className="fa fa-send"/> {t.__('Send')}
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </FormGroup>
            </div>
        );
    }

    // render
    renderMiniForm() {
        return (
            <div className="inboxContent">
                <div className="messagesContent miniForm">
                    <UsersModal
                        isOpen={this.state.showInvite}
                        mdToggle={() => this.setState({showInvite: false})}
                        selected={this.state.selectedInvites}
                        onChange={(selectedInvites) => this.setState({selectedInvites})}
                        onOk={(invites) => this.sendInvite(invites)}/>
                    {this.renderChatMessages()}
                </div>
                <FormGroup className="messageInput">
                    <div className="controls">
                        <InputGroup>
                            <Input type="text"
                                   bsSize="sm"
                                   name="message"
                                   value={this.state.chat.message || ''}
                                   placeholder={t.__('Enter Message')}
                                   onChange={this.changeChatInfo}
                                   onKeyPress={this.handleMessageKeyPress}/>
                            <InputGroupAddon addonType="append">
                                <Button type="button"
                                        color="primary"
                                        size="sm"
                                        onClick={() => this.sendMessage()}>
                                    <i className="fa fa-send"/>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </FormGroup>
            </div>
        );
    }

    // main render
    render() {
        const {status, miniForm} = this.props;
        if (status === ChatChannelUserStatus.Inactive) {
            return (
                <div className="inboxContent">
                    <Alert color="danger">{t.__('You can not access this channel!')}</Alert>
                </div>
            );
        }

        if (status === ChatChannelUserStatus.Waiting) {
            return (
                <div className="inboxContent">
                    <Alert color="warning">{t.__('Please accept to join!')}</Alert>
                    <Button block
                            color="primary"
                            onClick={() => this.joinChat()}><T>Join</T></Button>
                </div>
            );
        }

        if (miniForm) {
            return this.renderMiniForm();
        }

        return this.renderFullForm();
    }
}

export default withRouter(container((props, onData) => {
    const channelId = props.channelId || '';
    Meteor.subscribe('chatChannels.detail', channelId);
    Meteor.subscribe('chatMessages.list', channelId);
    Meteor.subscribe('users.list');
    Meteor.subscribe('medias.list', 'UserAvatar');
    let status = ChatChannelUserStatus.Inactive;
    let chats = [];
    const channel = ChatChannels.findOne(channelId);
    if (channel && channel._id) {
        status = ChatChannelUserStatus.Waiting;
        const pos = _.findIndex(channel.users, {
            _id: Meteor.userId(),
            status: ChatChannelUserStatus.Active
        });

        if (pos >= 0) {
            status = ChatChannelUserStatus.Active;
            chats = ChatMessages.find({channelId: channelId}).fetch();
            chats.forEach((chat, i) => {
                let user = Users.queryOne(Meteor.user(), chat.userId);
                let mediaLink = Meteor.absoluteUrl('img/avatars/6.jpg');
                if (user && user.profile && user.profile.avatar) {
                    const media = Medias.findOne(user.profile && user.profile.avatar);
                    if (media) {
                        mediaLink = media.link();
                    }
                }

                chats[i].user = user;
                chats[i].avatar = mediaLink;
            });
        }
    }

    onData(null, {
        channel: channel,
        chats: chats,
        status: status
    });
}, FormChatComponent));