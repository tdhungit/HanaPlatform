import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';
import {
    Button, Input,
    FormGroup, InputGroup, InputGroupAddon,
    ButtonGroup,
    Alert
} from 'reactstrap';
import 'react-chat-elements/dist/main.css';
import {MessageList} from 'react-chat-elements';

import {t} from '../../../../common/Translation';
import container from '../../../../common/Container';
import ChatMessages from '../../../../collections/ChatMessages/ChatMessages';
import Users from '../../../../collections/Users/Users';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';
import Medias from '../../../../collections/Medias/Medias';
import {utilsHelper} from '../../helpers/utils/utils';
import {UsersModal} from '../../helpers/tags/UsersModal';

class FormChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: {},
            messagesHeight: 0,
            showInvite: false
        };

        this.changeChatInfo = this.changeChatInfo.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleMessageKeyPress = this.handleMessageKeyPress.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
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

    sendInvite() {

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
                title: chat.user.username,
                avatar: chat.avatar,
                text: chat.message,
                dateString: utilsHelper.toDateTimeDisplay(chat.createdAt),
            });
        });

        return sources;
    }

    renderChatMessages() {
        const dataSources = this.getChatSources();
        return (
            <div className="messagesContent"
                 style={{height: this.state.messagesHeight}}>
                <MessageList
                    className="messages"
                    lockable={true}
                    toBottomHeight="100%"
                    dataSource={dataSources}/>
            </div>
        );
    }

    render() {
        const {chats} = this.props;
        if (!chats) {
            return (
                <div className="inboxContent">
                    <Alert color="danger">{t.__('You can not access this channel!')}</Alert>
                </div>
            );
        }

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
                        mdToggle={() => this.setState({showInvite: false})}/>
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
}

export default withRouter(container((props, onData) => {
    const channelId = props.channelId || '';
    Meteor.subscribe('chatChannels.detailActive', channelId);
    Meteor.subscribe('chatMessages.list', channelId);
    Meteor.subscribe('medias.list', 'UserAvatar');
    let chats = null;
    const channel = ChatChannels.findOne(channelId);
    if (channel && channel._id) {
        chats = ChatMessages.find({channelId: channelId}).fetch();
        chats.forEach((chat, i) => {
            let user = Users.queryOne(Meteor.user(), chat.userId);
            let mediaLink = Meteor.absoluteUrl('img/avatars/6.jpg');
            if (user.profile && user.profile.avatar) {
                const media = Medias.findOne(user.profile && user.profile.avatar);
                if (media) {
                    mediaLink = media.link();
                }
            }

            chats[i].user = user;
            chats[i].avatar = mediaLink;
        });
    }

    onData(null, {
        chats: chats
    });
}, FormChatComponent));