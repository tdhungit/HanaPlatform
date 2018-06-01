import React, {Component} from 'react';
import container from '../../../../common/Container';
import {Meteor} from 'meteor/meteor';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';
import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import FormChatComponent from './FormChatComponent';
import {
    Row, Col,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input
} from 'reactstrap';

class WidgetChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            isCreateChannel: false,
            channel: {},
            keyword: '',
            userList: []
        };

        this.changeChannelInfo = this.changeChannelInfo.bind(this);
    }

    minimizeWindow(channel) {
        let data = {};
        data._id = channel._id;
        data.isChatting = !channel.isChatting;
        Meteor.call('chatChannels.update', data, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            }
        });
    }

    activeChat(channel) {
        let data = {};
        data._id = channel._id;
        data.isActive = true;
        data.isChatting = true;
        Meteor.call('chatChannels.update', data, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            }
        });
    }

    removeChat(channel) {
        let data = {};
        data._id = channel._id;
        data.isActive = false;
        data.isChatting = false;
        Meteor.call('chatChannels.update', data, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            }
        });
    }

    inviteChat(event) {
        event.stopPropagation();
        this.formChat.setState({showInvite: true});
    }

    changeChannelInfo(event) {
        const name = event.target.name;
        const value = event.target.value;
        let channel = {...this.state.channel};
        channel[name] = value;
        this.setState({channel});
    }

    createChannel() {
        let channel = {...this.state.channel};
        channel.isActive = true;
        channel.isChatting = true;
        Meteor.call('chatChannels.insert', channel, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            } else {
                this.setState({isCreateChannel: false});
            }
        });
    }

    searchUser(event) {
        const keyword = event.target.value;
        this.setState({keyword: keyword});
        if (keyword) {
            Meteor.call('users.searchKeyword', keyword, (error, res) => {
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    this.setState({userList: res});
                }
            })
        }
    }

    createPrivateChannel(friendId) {
        if (friendId) {
            Meteor.call('chatChannels.directMessage', friendId, true, (error) => {
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    this.setState({
                        keyword: '',
                        userList: []
                    });
                }
            });
        }
    }

    // render
    renderChatWindowHeader(channel) {
        return (
            <div className="ChatWindow-header"
                 onClick={() => this.minimizeWindow(channel)}>
                <strong>{channel.name}</strong>
                <div className="ChatWindow-controls">
                    <a href="javascript:void(0)"
                       onClick={(event) => this.inviteChat(event)}>
                        <i className="fa fa-user-plus"/>
                    </a>
                    <a href="javascript:void(0)"
                       onClick={() => this.removeChat(channel)}>
                        <i className="fa fa-remove"/>
                    </a>
                </div>
            </div>
        );
    }

    // render
    renderChatChannelsHeader() {
        return (
            <div className="ChatChannels-header"
                 onClick={() => this.setState({isShow: !this.state.isShow})}>
                <strong><T>Chats</T></strong>
                <div className="ChatChannels-controls">
                    <a href="javascript:void(0)"
                       onClick={(event) => {
                           event.stopPropagation();
                           this.setState({isCreateChannel: true})
                       }}>
                        <i className="fa fa-plus-circle"/>
                    </a>
                </div>
            </div>
        );
    }

    // render
    renderModalCreateChannel() {
        return (
            <Modal isOpen={this.state.isCreateChannel}>
                <ModalHeader toggle={() => this.setState({isCreateChannel: false})}>
                    <T>Create new Channel</T>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Name</T></Label>
                                <Input type="text"
                                       name="name"
                                       placeholder={t.__('Name')}
                                       onChange={this.changeChannelInfo}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary"
                            onClick={() => this.createChannel()}>
                        <i className="fa fa-send"/> <T>Create</T>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

    render() {
        const {channels, activeChannels} = this.props;

        return (
            <div id="WidgetChatComponent">
                <div className="ChatWindows">
                    {activeChannels.map((channel, i) => {
                        const display = channel.isChatting ? 'block' : 'none';

                        return (
                            <div className="ChatWindow" key={i}>
                                {this.renderChatWindowHeader(channel)}
                                <div className="ChatWindow-body"
                                     style={{display: display}}>
                                    <FormChatComponent
                                        channelId={channel._id}
                                        miniForm={true}
                                        messagesHeight={222}
                                        onRef={(ref) => this.formChat = ref}/>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="ChatChannels">
                    {this.renderChatChannelsHeader()}
                    <div className="ChatChannels-body"
                         style={{display: this.state.isShow ? 'block' : 'none'}}>
                        <Input type="text"
                               bsSize="sm"
                               placeholder={t.__('Search user')}
                               value={this.state.keyword}
                               onChange={(event) => this.searchUser(event)}/>
                        <ul>
                            {channels.map((channel, i) => {
                                return (
                                    <li key={'channel' + i}>
                                        <a href="javascript:void(0)"
                                           onClick={() => this.activeChat(channel)}>
                                            <i className="fa fa-comments"/> {channel.name}
                                        </a>
                                    </li>
                                );
                            })}

                            {this.state.userList.map((user, i) => {
                                return (
                                    <li key={'user' + i}>
                                        <a href="javascript:void(0)"
                                           onClick={() => this.createPrivateChannel(user._id)}>
                                            <i className="fa fa-user-plus"/> {user.username}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {this.renderModalCreateChannel()}
            </div>
        );
    }
}

export default container((props, onData) => {
    Meteor.subscribe('chatChannels.list');

    const channels = ChatChannels.find().fetch();
    const activeChannels = ChatChannels.find({isActive: true}).fetch();

    onData(null, {
        channels: channels,
        activeChannels: activeChannels
    });
}, WidgetChatComponent);