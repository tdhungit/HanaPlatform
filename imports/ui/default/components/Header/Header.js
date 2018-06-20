import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    Table
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {t, T} from '/imports/common/Translation';
import {ImageTag} from '../../helpers/tags/MediaImage';
import BranchOffices from '/imports/collections/BranchOffices/BranchOffices';
import {utilsHelper} from '../../helpers/utils/utils';
import {ChatInviteModal} from '../../pages/notifications/helpers/ChatInviteModal';
import Notifications from '../../../../collections/Notifications/Notifications';
import {NotificationTypes} from '../../../../collections/Notifications/config';
import container from '../../../../common/Container';
import Users from '../../../../collections/Users/Users';
import {NotificationUtils} from '../../pages/notifications/helpers/utils';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            branchOfficeDropdownOpen: false, // dropdown
            userDropdownOpen: false, // dropdown
            selectBranchOffice: false, // dropdown
            notificationDropdownOpen: false, // dropdown

            notificationModalId: '',
            currentBranchOffice: {}
        };
    }

    componentWillMount() {
        const currentUser = Meteor.user();
        // get current branch office
        if (currentUser.settings && currentUser.settings.branchOfficeId) {
            this.state.currentBranchOffice = BranchOffices.findOne(currentUser.settings.branchOfficeId);
        }
        // check current branch office
        this.state.selectBranchOffice = !(this.state.currentBranchOffice && this.state.currentBranchOffice._id);
    }

    toggle(dropdown) {
        this.setState({
            [dropdown]: !this.state[dropdown]
        });
    }

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    handleLogout() {
        Meteor.logout(() => {
            this.props.history.push('/login');
        });
    }

    chooseBranchOffice(branchOfficeId) {
        let settings = Meteor.user().settings || {};
        settings.branchOfficeId = branchOfficeId;
        const data = {
            _id: Meteor.userId(),
            settings: settings
        };

        Meteor.call('users.update', data, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            } else {
                this.setState({
                    selectBranchOffice: false,
                    currentBranchOffice: BranchOffices.findOne(branchOfficeId)
                });
                window.location.reload();
            }
        });
    }

    handleClickNotify(notify) {
        if (notify.type === NotificationTypes.ChatInvite) {
            this.setState({notificationModalId: notify._id});
        } else if (notify.type === NotificationTypes.Message) {
            if (notify.destination) {
                NotificationUtils.read(notify._id);
                this.props.history.push(notify.destination);
            }
        }
    }

    toastMsg(notify) {
        if (notify.isNotify) {
            const Msg = () => {
                return (
                    <a href="javascript:void(0)" onClick={() => this.handleClickNotify(notify)}>
                        {notify.message}
                    </a>
                );
            };

            utilsHelper.toast(<Msg/>);
        }
    }

    renderBranchOffices() {
        const {branchOffices} = this.props;
        return (
            <NavItem>
                <Dropdown isOpen={this.state.branchOfficeDropdownOpen}
                          toggle={() => this.toggle('branchOfficeDropdownOpen')}>
                    <DropdownToggle className="nav-link dropdown-toggle">
                        {this.state.selectBranchOffice ?
                            t.__('Branch Office') :
                            this.state.currentBranchOffice.name}
                    </DropdownToggle>

                    <DropdownMenu right className={this.state.branchOfficeDropdownOpen ? 'show' : ''}>
                        {branchOffices.map((branchOffice) => {
                            return (
                                <DropdownItem key={branchOffice._id} onClick={() => this.chooseBranchOffice(branchOffice._id)}>
                                    {branchOffice.name}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </NavItem>
        );
    }

    renderNotification() {
        const {notifies, notifiesCount} = this.props;
        return (
            <NavItem className="d-md-down-none">
                <Dropdown isOpen={this.state.notificationDropdownOpen}
                          toggle={() => this.toggle('notificationDropdownOpen')}>
                    <DropdownToggle className="nav-link">
                        <i className="icon-bell"/> <Badge pill color="danger">{notifiesCount}</Badge>
                    </DropdownToggle>
                    <DropdownMenu right className={this.state.notificationDropdownOpen ? 'show' : ''}>
                        {notifiesCount > 0 ? notifies.map((notify, i) => {
                            if (notify.isNotify) {
                                this.toastMsg(notify);
                                NotificationUtils.notified(notify._id);
                            }

                            return (
                                <DropdownItem key={i}
                                              onClick={() => this.handleClickNotify(notify)}>
                                    <i className="fa fa-bell-o"/> {notify.message}
                                </DropdownItem>
                            )
                        }) : <DropdownItem><T>Have no Notification</T></DropdownItem>}
                    </DropdownMenu>
                </Dropdown>
            </NavItem>
        );
    }

    renderUserMenu() {
        const {currentUser} = this.props;
        return (
            <NavItem>
                <Dropdown isOpen={this.state.userDropdownOpen}
                          toggle={() => this.toggle('userDropdownOpen')}>
                    <DropdownToggle className="nav-link dropdown-toggle">
                        <ImageTag
                            media={
                                currentUser.profile
                                && currentUser.profile.avatar
                                    ? currentUser.profile.avatar : ''
                            }
                            className="img-avatar" alt={currentUser && currentUser.username}/>
                        <span className="d-md-down-none">{currentUser && currentUser.username}</span>
                    </DropdownToggle>

                    <DropdownMenu right className={this.state.userDropdownOpen ? 'show' : ''}>
                        <DropdownItem header tag="div" className="text-center">
                            <strong>Account</strong>
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fa fa-bell-o"/> Updates<Badge color="info">42</Badge>
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fa fa-envelope-o"/> Messages<Badge color="success">42</Badge>
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fa fa-tasks"/> Tasks<Badge color="danger">42</Badge>
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fa fa-comments"/> Comments<Badge color="warning">42</Badge>
                        </DropdownItem>
                        <DropdownItem header tag="div" className="text-center">
                            <strong>Settings</strong>
                        </DropdownItem>
                        <DropdownItem onClick={() => this.props.history.push('/manager/me')}>
                            <i className="fa fa-user"/> <T>Profile</T>
                        </DropdownItem>
                        <DropdownItem>
                            <i className="fa fa-wrench"/> <T>Settings</T>
                        </DropdownItem>
                        {/*<DropdownItem divider/>*/}
                        <DropdownItem onClick={() => this.handleLogout()}>
                            <i className="fa fa-lock"/> <T>Logout</T>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavItem>
        );
    }

    render() {
        const {branchOffices} = this.props;

        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                <NavbarBrand href="#"/>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <Link to="/manager" className="nav-link">Dashboard</Link>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/manager/users" className="nav-link">Users</Link>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/manager/settings" className="nav-link">Settings</Link>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    {this.renderBranchOffices()}
                    {this.renderNotification()}

                    <NavItem className="d-md-down-none">
                        <Link to="/manager/activities/calendar" className="nav-link">
                            <i className="icon-calendar"/>
                        </Link>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <Link to="/manager/chats" className="nav-link">
                            <i className="icon-bubble"/>
                        </Link>
                    </NavItem>

                    {this.renderUserMenu()}
                </Nav>

                <NavbarToggler className="d-md-down-none"
                               type="button"
                               onClick={this.asideToggle}>&#9776;</NavbarToggler>

                {/* check notification */}
                <ChatInviteModal
                    notifyId={this.state.notificationModalId}
                    opened={() => {this.setState({notificationModalId: ''})}}/>

                {/* check branch office */}
                <Modal isOpen={this.state.selectBranchOffice}>
                    <ModalHeader><T>Select</T> <T>Branch Offices</T></ModalHeader>
                    <ModalBody>
                        <Table bordered hover>
                            <tbody>
                            {branchOffices.map((branchOffice) => {
                                return (
                                    <tr key={branchOffice._id} onClick={() => this.chooseBranchOffice(branchOffice._id)}>
                                        <td>{branchOffice.name}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    </ModalBody>
                </Modal>
            </header>
        )
    }
}

export default container((props, onData) => {
    const currentUser = Users.findOne(Meteor.userId());
    const branchOffices = BranchOffices.ofUser(currentUser);
    const notifiesCursor = Notifications.find({isRead: false});

    onData(null, {
        currentUser: currentUser,
        branchOffices: branchOffices,
        notifiesCount: notifiesCursor.count(),
        notifies: notifiesCursor.fetch()
    });
}, Header);
