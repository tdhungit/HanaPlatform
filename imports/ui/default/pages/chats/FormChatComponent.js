import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Button, Input,
    FormGroup, InputGroup, InputGroupAddon,
    ButtonGroup,
    Alert
} from 'reactstrap';
import {t} from '../../../../common/Translation';
import container from '../../../../common/Container';
import ChatMessages from '../../../../collections/ChatMessages/ChatMessages';
import Users from '../../../../collections/Users/Users';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';

class FormChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: {},
            messagesHeight: 0
        };

        this.changeChatInfo = this.changeChatInfo.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({messagesHeight: window.innerHeight - 320});
    }

    changeChatInfo(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let chat = {...this.state.chat};
        chat[name] = value;
        this.setState({chat});
    }

    sendMessage() {
        let chat = {...this.state.chat};
        chat.channelId = this.props.channelId;
        Meteor.call('chatMessages.insert', chat, (error) => {
            if (error) {
                console.log(error);
                Bert.alert(t.__('Error! Please contact with Admin'), 'danger');
            } else {
                this.setState({chat: {}});

                const {refs, props} = this;
                const scrollTop = refs.messagesRef.scrollTop;
                if (scrollTop === 0) {
                    props.fetchHistory();
                }
            }
        });
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
                            <Button type="button" color="light">
                                <i className="fa fa-user-plus"/>
                            </Button>
                            <Button type="button" color="light">
                                <i className="fa fa-cogs"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <ul className="messages"
                        ref="messagesRef"
                        style={{height: this.state.messagesHeight}}>
                        {chats.map((chat, i) => {
                            return (
                                <li className="message" key={i}>
                                    <div className="actions">

                                    </div>
                                    <div className="header">
                                        <span className="from">
                                            {chat.user && chat.user.username || 'Unknown'}
                                        </span>
                                        <span className="date">{chat.createdAt}</span>
                                    </div>
                                    <div className="description">
                                        {chat.message}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <FormGroup className="messageInput">
                    <div className="controls">
                        <InputGroup>
                            <Input type="text"
                                   name="message"
                                   value={this.state.chat.message || ''}
                                   placeholder={t.__('Enter Message')}
                                   onChange={this.changeChatInfo}/>
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
    Meteor.subscribe('chatChannels.detail', channelId);
    Meteor.subscribe('chatMessages.list', channelId);
    let chats = null;
    const channel = ChatChannels.queryOne(Meteor.user(), channelId);
    if (channel && channel._id) {
        chats = ChatMessages.find({channelId: channelId}).fetch();
        chats.forEach((chat, i) => {
            chats[i].user = Users.queryOne(Meteor.user(), chat.userId);
        });
    }

    onData(null, {
        chats: chats
    });
}, FormChatComponent));