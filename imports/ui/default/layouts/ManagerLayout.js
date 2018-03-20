import React, {Component} from 'react';
import {Container} from 'reactstrap';

import Authenticate from '../components/Router/Authenticate';
import Header from '../components/Header/Header';
import AppNavigation from '../components/Navigation/AppNavigation';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Footer from '../components/Footer/Footer';

import Dashboard from '../pages/dashboard/Dashboard';
import ViewProfile from '../pages/users/ViewProfile';

import ViewUsers from '../pages/users/ViewUsers';
import ViewUser from '../pages/users/ViewUser';
import CreateUser from '../pages/users/CreateUser';
import EditUser from '../pages/users/EditUser';

import ViewRoles from '../pages/acl/ViewRoles';
import CreateRole from '../pages/acl/CreateRole';
import ViewPermissions from '../pages/acl/ViewPermissions';
import ViewUserGroups from '../pages/acl/ViewUserGroups';
import CreateUserGroup from '../pages/acl/CreateUserGroup';
import ViewUserGroup from '../pages/acl/ViewUserGroup';
import EditUserGroup from '../pages/acl/EditUserGroup';

import CreateMainMenu from '../pages/main_menus/CreateMainMenu';
import ViewMainMenus from '../pages/main_menus/ViewMainMenus';
import EditMainMenu from '../pages/main_menus/EditMainMenu';

import SystemSettings from '../pages/settings/SystemSettings';
import AppListStringsSettings from '../pages/settings/AppListStringsSettings';

import ViewCalendar from '../pages/activities/ViewCalendar';
import ViewActivities from '../pages/activities/ViewActivities';
import CreateActivity from '../pages/activities/CreateActivity';
import EditActivity from '../pages/activities/EditActivity';
import ViewActivity from '../pages/activities/ViewActivity';

import ViewModels from '../pages/models/ViewModels';
import CreateModel from '../pages/models/CreateModel';
import ViewModel from '../pages/models/ViewModel';
import EditModel from '../pages/models/EditModel';
import ListView from '../pages/models/templates/ListView';
import CreateView from '../pages/models/templates/CreateView';
import EditView from '../pages/models/templates/EditView';
import DetailView from '../pages/models/templates/DetailView';

class ManagerLayout extends Component {
    render() {
        const appProps = this.props;
        return (
            <div className="HanaPlatformManager app">
                <Header {...appProps}/>
                <div className="app-body">
                    <AppNavigation {...appProps}/>
                    <Sidebar {...appProps}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <Authenticate exact path="/manager" component={Dashboard} {...appProps}/>
                            <Authenticate exact path="/manager/dashboard" component={Dashboard} {...appProps}/>
                            <Authenticate exact path="/manager/me" component={ViewProfile} {...appProps}/>

                            <Authenticate exact path="/manager/users" component={ViewUsers} {...appProps}/>
                            <Authenticate exact path="/manager/users/create" component={CreateUser} {...appProps}/>
                            <Authenticate exact path="/manager/users/:_id/edit" component={EditUser} {...appProps}/>
                            <Authenticate exact path="/manager/users/:_id/detail" component={ViewUser} {...appProps}/>

                            <Authenticate exact path="/manager/roles" component={ViewRoles} {...appProps}/>
                            <Authenticate exact path="/manager/roles/create" component={CreateRole} {...appProps}/>
                            <Authenticate exact path="/manager/roles/:name/permissions" component={ViewPermissions} {...appProps}/>
                            <Authenticate exact path="/manager/user-groups" component={ViewUserGroups} {...appProps}/>
                            <Authenticate exact path="/manager/user-groups/create" component={CreateUserGroup} {...appProps}/>
                            <Authenticate exact path="/manager/user-groups/:_id/edit" component={EditUserGroup} {...appProps}/>
                            <Authenticate exact path="/manager/user-groups/:_id/detail" component={ViewUserGroup} {...appProps}/>

                            <Authenticate exact path="/manager/settings" component={SystemSettings} {...appProps}/>
                            <Authenticate exact path="/manager/settings/dropdown-list" component={AppListStringsSettings} {...appProps}/>
                            <Authenticate exact path="/manager/main-menus" component={ViewMainMenus} {...appProps}/>
                            <Authenticate exact path="/manager/main-menus/create" component={CreateMainMenu} {...appProps}/>
                            <Authenticate exact path="/manager/main-menus/:_id/edit" component={EditMainMenu} {...appProps}/>

                            <Authenticate exact path="/manager/activities/calendar" component={ViewCalendar} {...appProps}/>
                            <Authenticate exact path="/manager/activities" component={ViewActivities} {...appProps}/>
                            <Authenticate exact path="/manager/activities/create" component={CreateActivity} {...appProps}/>
                            <Authenticate exact path="/manager/activities/:_id/edit" component={EditActivity} {...appProps}/>
                            <Authenticate exact path="/manager/activities/:_id/detail" component={ViewActivity} {...appProps}/>

                            <Authenticate exact path="/manager/models" component={ViewModels} {...appProps}/>
                            <Authenticate exact path="/manager/models/create" component={CreateModel} {...appProps}/>
                            <Authenticate exact path="/manager/models/:_id/detail" component={ViewModel} {...appProps}/>
                            <Authenticate exact path="/manager/models/:_id/edit" component={EditModel} {...appProps}/>
                            <Authenticate exact path="/manager/model/:_model/list" component={ListView} {...appProps}/>
                            <Authenticate exact path="/manager/model/:_model/create" component={CreateView} {...appProps}/>
                            <Authenticate exact path="/manager/model/:_model/:_id/edit" component={EditView} {...appProps}/>
                            <Authenticate exact path="/manager/model/:_model/:_id/detail" component={DetailView} {...appProps}/>
                        </Container>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ManagerLayout;
