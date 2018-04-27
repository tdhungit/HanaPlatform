import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Button, Input,
    FormGroup, InputGroup, InputGroupAddon,
    ButtonGroup
} from 'reactstrap';
import {t} from '../../../../common/Translation';
import container from '../../../../common/Container';
import ChatMessages from '../../../../collections/ChatMessages/ChatMessages';

class FormChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: {}
        };

        this.changeChatInfo = this.changeChatInfo.bind(this);
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
            }
        });
    }

    render() {
        const chats = this.props.chats || [];

        return (
            <div className="inboxContent">
                <div className="messageContent">
                    <div className="toolbar">
                        <ButtonGroup>
                            <Button type="button" color="light">
                                <i className="fa fa-cogs"/>
                            </Button>
                            <Button type="button" color="light">
                                <i className="fa fa-cogs"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <ul className="messages">
                        {chats.map((chat, i) => {
                            return (
                                <li className="message" key={i}>
                                    <div className="actions">

                                    </div>
                                    <div className="header">
                                        <span className="from">Jacky</span>
                                        <span className="date">20/10/2018</span>
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
    Meteor.subscribe('chatMessages.list', channelId);
    onData(null, {
        chats: ChatMessages.find({channelId: channelId}).fetch()
    });
}, FormChatComponent));