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

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            branchOfficeDropdownOpen: false, // dropdown
            userDropdownOpen: false, // dropdown
            selectBranchOffice: false, // dropdown
            branchOffices: [],
            currentBranchOffice: {}
        };
    }

    componentWillMount() {
        const currentUser = Meteor.user();
        this.state.branchOffices = BranchOffices.ofUser(currentUser);
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

    render() {
        const currentUser = Meteor.user();

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
                    <NavItem>
                        <Dropdown isOpen={this.state.branchOfficeDropdownOpen}
                                  toggle={() => this.toggle('branchOfficeDropdownOpen')}>
                            <DropdownToggle className="nav-link dropdown-toggle">
                                {this.state.selectBranchOffice ?
                                    t.__('Branch Office') :
                                    this.state.currentBranchOffice.name}
                            </DropdownToggle>

                            <DropdownMenu right className={this.state.branchOfficeDropdownOpen ? 'show' : ''}>
                                {this.state.branchOffices.map((branchOffice) => {
                                    return (
                                        <DropdownItem key={branchOffice._id} onClick={() => this.chooseBranchOffice(branchOffice._id)}>
                                            {branchOffice.name}
                                        </DropdownItem>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#">
                            <i className="icon-bell"/><Badge pill color="danger">5</Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <Link to="/manager/activities/calendar" className="nav-link">
                            <i className="icon-list"/>
                        </Link>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <NavLink href="#">
                            <i className="icon-location-pin"/>
                        </NavLink>
                    </NavItem>
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
                                    <i className="fa fa-user"/> Profile
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-wrench"/> Settings
                                </DropdownItem>
                                {/*<DropdownItem divider/>*/}
                                <DropdownItem onClick={this.handleLogout.bind(this)}>
                                    <i className="fa fa-lock"/> Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                </Nav>

                <NavbarToggler className="d-md-down-none" type="button"
                               onClick={this.asideToggle}>&#9776;</NavbarToggler>

                {/* check notification */}
                <ChatInviteModal/>

                {/* check branch office */}
                <Modal isOpen={this.state.selectBranchOffice}>
                    <ModalHeader><T>Select</T> <T>Branch Offices</T></ModalHeader>
                    <ModalBody>
                        <Table bordered hover>
                            <tbody>
                            {this.state.branchOffices.map((branchOffice) => {
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

export default Header;
