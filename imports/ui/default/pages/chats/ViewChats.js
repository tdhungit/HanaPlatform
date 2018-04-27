import React, {Component} from 'react';

import {t, PT} from '../../../../common/Translation';
import ListChannelsComponent from './ListChannelsComponent';

class ViewChats extends Component {
    static viewInfo = {controller: 'Chats', action: 'List'};

    render() {
        return (
            <div className="ViewChats animated fadeIn">
                <PT title={t.__('Chats')}/>
                <div className="email-app mb-4">
                    <ListChannelsComponent/>
                    <main className="inbox">
                        <h3>Welcome to Hana Chat!</h3>
                    </main>
                </div>
            </div>
        );
    }
}

export default ViewChats;
