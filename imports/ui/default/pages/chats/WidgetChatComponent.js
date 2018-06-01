import React, {Component} from 'react';
import container from '../../../../common/Container';
import {Meteor} from 'meteor/meteor';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';
import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import FormChatComponent from './FormChatComponent';

class WidgetChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false
        };
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

    renderChatChannelsHeader() {
        return (
            <div className="ChatChannels-header"
                 onClick={() => this.setState({isShow: !this.state.isShow})}>
                <strong><T>Chats</T></strong>
            </div>
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
                        <ul>
                            {channels.map((channel, i) => {
                                return (
                                    <li key={i}>
                                        <a href="javascript:void(0)"
                                           onClick={() => this.activeChat(channel)}>
                                            <i className="fa fa-comments"/> {channel.name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
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