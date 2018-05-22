import React, {Component} from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button,
    ListGroup, ListGroupItem,
    Badge
} from 'reactstrap';
import BootstrapPaginator from 'react-bootstrap-pagination';

import {T} from '/imports/common/Translation';
import Users from '../../../../collections/Users/Users';
import container from '../../../../common/Container';

export class UsersModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {}
        };

        this.toggle = this.toggle.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.limit = Users.getLimit();
        this.pagination = Users.pagination();
        this.state.selected = this.props.selected || {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected) {
            this.setState({selected: nextProps.selected});
        }
    }

    toggle() {
        const {mdToggle} = this.props;
        mdToggle && mdToggle();
    }

    onChange(userSelected) {
        const {onChange} = this.props;
        onChange && onChange(userSelected);
        this.setState({selected: userSelected});
    }

    onOk() {
        const {onOk} = this.props;
        onOk && onOk(this.state.selected);
    }

    onCancel() {
        const {mdCancel} = this.props;
        if (mdCancel) {
            mdCancel();
        } else {
            this.toggle();
        }
    }

    render() {
        const {isOpen} = this.props;

        return (
            <Modal isOpen={isOpen}
                   toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                    <i className="fa fa-users"/> <T>Users</T>
                </ModalHeader>
                <ModalBody>
                    <ListUsers
                        selected={this.state.selected}
                        pagination={this.pagination}
                        limit={this.limit}
                        onChange={(userSelected) => this.onChange(userSelected)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            onClick={this.onOk}>
                        <T>Select</T>
                    </Button>{' '}
                    <Button color="secondary"
                            onClick={this.onCancel}>
                        <T>Cancel</T>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class ListUsersContainer extends Component {
    selectInvite(user) {
        const {onChange, selected} = this.props;
        let userSelected = {...selected};
        if (userSelected[user._id]) {
            delete userSelected[user._id];
        } else {
            userSelected[user._id] = {
                _id: user._id,
                username: user.username
            };
        }

        onChange && onChange(userSelected);
    }

    render() {
        const {pagination, limit, records, selected} = this.props;

        return (
            <div>
                <ListGroup>
                    {records.map((record, i) => {
                        return (
                            <ListGroupItem key={i}
                                           tag="a"
                                           href="javascript:void(0)"
                                           onClick={() => this.selectInvite(record)}>
                                {record.username}
                                <Badge color="secondary" className="float-right">
                                    {selected
                                     && selected[record._id]
                                     && selected[record._id]._id ?
                                        <i className="fa fa-check-circle-o"/> :
                                        <i className="fa fa-circle-o"/>}
                                </Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
                <BootstrapPaginator pagination={pagination}
                                    limit={limit}
                                    containerClass="pagination-sm"/>
            </div>
        );
    }
}
export const ListUsers = container((props, onData) => {
    if (props.pagination.ready()) {
        const records = props.pagination.getPage();
        const totalPages = props.pagination.totalPages();
        onData(null, {
            records,
            totalPages
        });
    }
}, ListUsersContainer);