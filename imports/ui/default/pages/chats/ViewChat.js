import React, {Component} from 'react';

import {t, PT} from '../../../../common/Translation';
import ListChannelsComponent from './ListChannelsComponent';
import FormChatComponent from './FormChatComponent';

class ViewChat extends Component {
    static viewInfo = {controller: 'Chats', action: 'View'};

    render() {
        const channelId = this.props.match.params.channelId;

        return (
            <div className="ViewChat animated fadeIn">
                <PT title={t.__('Chats')}/>
                <div className="email-app mb-4">
                    <ListChannelsComponent channelId={channelId}/>
                    <main className="inbox">
                        <FormChatComponent channelId={channelId}/>
                    </main>
                </div>
            </div>
        );
    }
}

export default ViewChat;