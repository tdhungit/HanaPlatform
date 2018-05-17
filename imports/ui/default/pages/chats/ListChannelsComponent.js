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
            channel: {}
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

    render() {
        const {channels} = this.props;

        return (
            <nav>
                <Button type="button" block color="danger"
                        onClick={() => this.setState({isCreateChannel: true})}>
                    <T>New Channel</T>
                </Button>
                <ul className="nav">
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
