import React, {Component} from 'react';
import container from '../../../../common/Container';
import {Meteor} from 'meteor/meteor';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';

import {t, T} from '/imports/common/Translation';

class WidgetChatComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShow: false,
            windows: {}
        }
    }

    render() {
        const {channels, activeChannels} = this.props;

        return (
            <div id="WidgetChatComponent">
                <div className="ChatWindows">
                    {activeChannels.map((channel, i) => {
                        let display = 'block';
                        if (!this.state.windows[channel._id]) {
                            display = 'block';
                        } else {
                            display = this.state.windows[channel._id] ? 'block' : 'none';
                        }

                        return (
                            <div className="ChatWindow" key={i}>
                                <div className="ChatWindow-header"
                                     onClick={() => {
                                         const cd = this.state.windows[channel._id] || true;
                                         const windows = {...this.state.windows};
                                         windows[channel._id] = !cd;
                                         this.setState({windows});
                                     }}>
                                    <strong>{channel.name}</strong>
                                </div>
                                <div className="ChatWindow-body"
                                     style={{display: display}}>

                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="ChatChannels">
                    <div className="ChatChannels-header"
                         onClick={() => this.setState({isShow: !this.state.isShow})}>
                        <strong><T>Chats</T></strong>
                    </div>
                    <div className="ChatChannels-body"
                         style={{display: this.state.isShow ? 'block' : 'none'}}>
                        <ul>
                            {channels.map((channel, i) => {
                                return (
                                    <li key={i}>
                                        <a href="javascript:void(0)">
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