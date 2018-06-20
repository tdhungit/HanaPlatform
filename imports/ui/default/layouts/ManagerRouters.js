import {HomeRouterModules, RouterModules} from '../../../modules/router.modules';
import Dashboard from '../pages/dashboard/Dashboard';
import ViewProfile from '../pages/users/ViewProfile';
import ViewUsers from '../pages/users/ViewUsers';
import CreateUser from '../pages/users/CreateUser';
import EditUser from '../pages/users/EditUser';
import ViewUser from '../pages/users/ViewUser';
import ViewRoles from '../pages/acl/ViewRoles';
import ViewRole from '../pages/acl/ViewRole';
import CreateRole from '../pages/acl/CreateRole';
import EditRole from '../pages/acl/EditRole';
import ViewPermissions from '../pages/acl/ViewPermissions';
import ViewUserGroups from '../pages/acl/ViewUserGroups';
import CreateUserGroup from '../pages/acl/CreateUserGroup';
import EditUserGroup from '../pages/acl/EditUserGroup';
import ViewUserGroup from '../pages/acl/ViewUserGroup';
import SystemSettings from '../pages/settings/SystemSettings';
import AppListStringsSettings from '../pages/settings/AppListStringsSettings';
import ViewMainMenus from '../pages/main_menus/ViewMainMenus';
import CreateMainMenu from '../pages/main_menus/CreateMainMenu';
import EditMainMenu from '../pages/main_menus/EditMainMenu';
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
import ViewCompanies from '../pages/companies/ViewCompanies';
import CreateCompany from '../pages/companies/CreateCompany';
import EditCompany from '../pages/companies/EditCompany';
import ViewCompany from '../pages/companies/ViewCompany';
import ViewBranchOffices from '../pages/companies/ViewBranchOffices';
import CreateBranchOffice from '../pages/companies/CreateBranchOffice';
import EditBranchOffice from '../pages/companies/EditBranchOffice';
import ViewBranchOffice from '../pages/companies/ViewBranchOffice';
import Index from '../pages/index/Index';
import About from '../pages/index/About';
import NotFound from '../pages/index/NotFound';
import ImportData from '../pages/settings/ImportData';
import ExportData from '../pages/settings/ExportData';
import ViewChats from '../pages/chats/ViewChats';
import ViewChat from '../pages/chats/ViewChat';

let HomeRouters = {
    "/": {component: Index},
    "/about-us": {component: About},
    "/404": {component: NotFound}
};

HomeRouters = Object.assign(HomeRouters, HomeRouterModules);
export {HomeRouters};

let ManagerRouters = {
    "/manager": {
        title: "Dashboard",
        component: Dashboard
    },
    "/manager/dashboard": {
        title: "Dashboard",
        component: Dashboard
    },
    "/manager/me": {
        title: "View Profile",
        component: ViewProfile
    },
    "/manager/companies": {
        title: "View Companies",
        component: ViewCompanies
    },
    "/manager/companies/create": {
        title: "Create Company",
        component: CreateCompany
    },
    "/manager/companies/:_id/edit": {
        title: "Edit Company",
        component: EditCompany
    },
    "/manager/companies/:_id/detail": {
        title: "View Company",
        component: ViewCompany
    },
    "/manager/branch-offices": {
        title: "View Branches",
        component: ViewBranchOffices
    },
    "/manager/branch-offices/create": {
        title: "Create Branch",
        component: CreateBranchOffice
    },
    "/manager/branch-offices/:_id/edit": {
        title: "Edit Branch",
        component: EditBranchOffice
    },
    "/manager/branch-offices/:_id/detail": {
        title: "View Branch",
        component: ViewBranchOffice
    },
    "/manager/users": {
        title: "View Users",
        component: ViewUsers
    },
    "/manager/users/create": {
        title: "Create User",
        component: CreateUser
    },
    "/manager/users/:_id/edit": {
        title: "Edit User",
        component: EditUser
    },
    "/manager/users/:_id/detail": {
        title: "View User",
        component: ViewUser
    },
    "/manager/roles": {
        title: "View Roles",
        component: ViewRoles
    },
    "/manager/roles/:_id/detail": {
        title: "View Role",
        component: ViewRole
    },
    "/manager/roles/create": {
        title: "Create Role",
        component: CreateRole
    },
    "/manager/roles/:_id/edit": {
        title: "Edit Role",
        component: EditRole
    },
    "/manager/roles/:_id/permissions": {
        title: "View Permissions",
        component: ViewPermissions
    },
    "/manager/user-groups": {
        title: "View Groups",
        component: ViewUserGroups
    },
    "/manager/user-groups/create": {
        title: "Create Group",
        component: CreateUserGroup
    },
    "/manager/user-groups/:_id/edit": {
        title: "Edit Group",
        component: EditUserGroup
    },
    "/manager/user-groups/:_id/detail": {
        title: "View Group",
        component: ViewUserGroup
    },
    "/manager/settings": {
        title: "System Settings",
        component: SystemSettings
    },
    "/manager/settings/dropdown-list": {
        title: "DropDown Settings",
        component: AppListStringsSettings
    },
    "/manager/main-menus": {
        title: "Main Menus",
        component: ViewMainMenus
    },
    "/manager/main-menus/create": {
        title: "Create Menu",
        component: CreateMainMenu
    },
    "/manager/main-menus/:_id/edit": {
        title: "Edit Menu",
        component: EditMainMenu
    },
    "/manager/activities/calendar": {
        title: "Calendar",
        component: ViewCalendar
    },
    "/manager/activities": {
        title: "View Activities",
        component: ViewActivities
    },
    "/manager/activities/create": {
        title: "Create Activity",
        component: CreateActivity
    },
    "/manager/activities/:_id/edit": {
        title: "Edit Activity",
        component: EditActivity
    },
    "/manager/activities/:_id/detail": {
        title: "View Activity",
        component: ViewActivity
    },
    "/manager/models": {
        title: "View Models",
        component: ViewModels
    },
    "/manager/models/create": {
        title: "Create Model",
        component: CreateModel
    },
    "/manager/models/:_id/detail": {
        title: "View Model",
        component: ViewModel
    },
    "/manager/models/:_id/edit": {
        title: "Edit Model",
        component: EditModel
    },
    "/manager/model/:_model/list": {
        title: "List View",
        component: ListView
    },
    "/manager/model/:_model/create": {
        title: "Create View",
        component: CreateView
    },
    "/manager/model/:_model/:_id/edit": {
        title: "Edit View",
        component: EditView
    },
    "/manager/model/:_model/:_id/detail": {
        title: "Detail View",
        component: DetailView
    },
    "/manager/import/:_collection": {
        title: "Import Data",
        component: ImportData
    },
    "/manager/export/:_collection": {
        title: "Export Data",
        component: ExportData
    },
    "/manager/chats": {
        title: "Chats",
        component: ViewChats
    },
    "/manager/chats/:channelId": {
        title: "Chat",
        component: ViewChat
    }
};

ManagerRouters = Object.assign(ManagerRouters, RouterModules);
export {ManagerRouters};
