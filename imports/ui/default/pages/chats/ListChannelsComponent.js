import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Row, Col,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '../../../../common/Container';
import ChatChannels from '../../../../collections/ChatChannels/ChatChannels';
import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';

class ListChannelsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCreateChannel: false,
            channel: {},
            search: '',
            userList: []
        };

        this.changeChannelInfo = this.changeChannelInfo.bind(this);
    }

    changeChannelInfo(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let channel = {...this.state.channel};
        channel[name] = value;
        this.setState({channel});
    }

    createChannel() {
        Meteor.call('chatChannels.insert', this.state.channel, (error, _id) => {
            utilsHelper.alertSystem(error);
            if (!error) {
                this.props.history.push('/manager/chats/' + _id);
            }
        });
    }

    createPrivateChannel(friendId) {
        if (friendId) {
            Meteor.call('chatChannels.directMessage', friendId, false, (error, _id) => {
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    this.setState({
                        search: '',
                        userList: []
                    });
                    this.props.history.push('/manager/chats/' + _id);
                }
            });
        }
    }

    searchUsers(keyword) {
        this.setState({search: keyword});
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

    renderSearchUsers() {
        if (this.state.userList.length <= 0) {
            return null;
        }

        return (
            <ul className="nav" style={{marginTop: 15}}>
                {this.state.userList.map((user, i) => {
                    return (
                        <li className="nav-item" key={i}>
                            <a href="javascript:void(0)"
                               className="nav-link"
                               onClick={() => this.createPrivateChannel(user._id)}>
                                <i className="fa fa-user"/> {user.username}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        const {channels} = this.props;

        return (
            <nav>
                <Button type="button" block color="danger"
                        onClick={() => this.setState({isCreateChannel: true})}>
                    <T>New Channel</T>
                </Button>

                <Input type="text"
                       value={this.state.search}
                       placeholder={t.__('Search Users')}
                       onChange={(event) => this.searchUsers(event.target.value)}/>
                {this.renderSearchUsers()}

                <ul className="nav" style={{marginTop: 15}}>
                    {channels.map((channel, i) => {
                        return (
                            <li className="nav-item" key={i}>
                                <Link to={'/manager/chats/' + channel._id} className="nav-link">
                                    <i className="fa fa-user"/> {channel.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Modal isOpen={this.state.isCreateChannel}>
                    <ModalHeader toggle={() => this.setState({isCreateChannel: false})}>
                        <T>Create new Channel</T>
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label><T>Name</T></Label>
                                    <Input type="text" name="name"
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
            </nav>
        );
    }
}

export default withRouter(container((props, onData) => {
    Meteor.subscribe('chatChannels.list');
    onData(null, {
        channels: ChatChannels.find({}).fetch() || []
    });
}, ListChannelsComponent));
