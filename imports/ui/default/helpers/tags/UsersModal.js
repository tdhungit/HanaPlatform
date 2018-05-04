import React, {Component} from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';
import BootstrapPaginator from 'react-bootstrap-pagination';

import {utilsHelper} from '../utils/utils';
import {T} from '/imports/common/Translation';
import Users from '../../../../collections/Users/Users';
import container from '../../../../common/Container';

export class UsersModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillMount() {
        this.limit = Users.getLimit();
        this.pagination = Users.pagination();
    }

    toggle() {
        this.props.mdToggle && this.props.mdToggle();
    }

    onOk() {
        this.props.mdOk && this.props.mdOk(this.child);
    }

    onCancel() {
        if (this.props.mdCancel) {
            this.props.mdCancel()
        } else {
            this.toggle();
        }
    }

    render() {
        const {isOpen} = this.props;

        return (
            <Modal isOpen={isOpen}
                   toggle={this.toggle}
                   className="modal-lg">
                <ModalHeader toggle={this.toggle}>
                    <i className="fa fa-users"/> <T>Users</T>
                </ModalHeader>
                <ModalBody>
                    <ListUsers pagination={this.pagination} limit={this.limit}/>
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
    render() {
        const {pagination, limit, records} = this.props;

        return (
            <div>
                <ListGroup>
                    {records.map((record, i) => {
                        return (
                            <ListGroupItem key={i}>
                                {record.username}
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