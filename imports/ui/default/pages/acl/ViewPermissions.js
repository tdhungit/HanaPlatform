import React, {Component} from 'react';
import {
    Row, Col,
    Card, CardHeader, CardBody, CardFooter,
    Table,
    Collapse,
    Button, Input, Label, Badge,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap';
import {Meteor} from 'meteor/meteor';

import {coreCollections} from '/imports/config/collections';
import ACLPermissions from '/imports/collections/ACLPermissions/ACLPermissions';
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';
import {T, t, PT} from '/imports/common/Translation';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import container from '/imports/common/Container';
import {permissionsAclDataTypes} from '../../../../collections/ACLPermissions/config';
import {modulesComponent} from '../../../../config/config.inc';
import {utilsHelper} from '../../helpers/utils/utils';

class ViewPermissions extends Component {
    static viewInfo = {controller: 'ACL', action: 'List'};

    constructor(props) {
        super(props);

        this.state = {
            acl_types: permissionsAclDataTypes,
            permissions: {},
            aclActions: {},
            actionsCollapse: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const {permissions, aclActions} = this.props;

        if (permissions) {
            this.state.permissions = permissions;
        }

        if (aclActions) {
            this.state.aclActions = aclActions;
        }
    }

    actionsCollapse(controllerName) {
        let collapse = {...this.state.actionsCollapse};
        if (!collapse[controllerName]) {
            collapse[controllerName] = false;
        }

        collapse[controllerName] = !collapse[controllerName];
        this.setState({actionsCollapse: collapse});
    }

    setPermissionActions(controllerName, actionName) {
        let aclActions = {...this.state.aclActions};

        if (!aclActions[controllerName]) {
            aclActions[controllerName] = {};
        }

        if (!aclActions[controllerName][actionName]) {
            aclActions[controllerName][actionName] = false;
        }

        aclActions[controllerName][actionName] = !aclActions[controllerName][actionName];
        this.setState({aclActions});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const name_array = name.split('_');
        const collection = name_array[1];
        const type = name_array[0];

        let permissions = this.state.permissions;
        if (!permissions[collection]) {
            permissions[collection] = {};
        }
        permissions[collection][type] = value;

        this.setState({permissions: permissions});
    }

    handleSubmit() {
        const {role} = this.props;

        Meteor.call('aclPermissions.update', this.state.permissions, this.state.aclActions, role._id, (error) => {
            utilsHelper.alertSystem(error);
        });
    }

    renderModuleActions() {
        let listActions = [];
        for (let controllerName in modulesComponent.controllers) {
            let actions = modulesComponent.controllers[controllerName] || modulesComponent.defaultActions;
            listActions.push(
                <Col sm="12" lg="4" key={controllerName}>
                    <ListGroup className="sm">
                        <ListGroupItem tag="button" action
                                       active={this.state.actionsCollapse[controllerName] || false}
                                       onClick={() => this.actionsCollapse(controllerName)}>
                            {controllerName}
                        </ListGroupItem>
                        <Collapse isOpen={this.state.actionsCollapse[controllerName] || false}>
                            <ListGroup className="sm" style={{marginTop: 7}}>
                                {actions.map((actionName, i) => {
                                    return (
                                        <ListGroupItem key={i} action
                                                       onClick={() => this.setPermissionActions(controllerName, actionName)}>
                                            {actionName}
                                            {this.state.aclActions[controllerName]
                                             && this.state.aclActions[controllerName][actionName] ?
                                                <Badge className="float-right" pill color="primary">
                                                    <i className="fa fa-check-circle"/>
                                                </Badge> :
                                                <Badge className="float-right" pill>
                                                    <i className="fa fa-circle-o"/>
                                                </Badge>}
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        </Collapse>
                    </ListGroup>
                </Col>
            );
        }

        return listActions;
    }

    renderActionAccess(role) {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-key"/>
                    <strong><T>Action Access</T> <T>Role</T></strong> {role.name}
                </CardHeader>
                <CardBody>
                    <Row>
                        {this.renderModuleActions()}
                    </Row>
                </CardBody>
            </Card>
        );
    }

    renderDataAccess(role) {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-key"/>
                    <strong><T>Permission Data</T> <T>Role</T></strong> {role.name}
                </CardHeader>
                <CardBody>
                    <Table responsive hover className="table-outline">
                        <thead>
                        <tr>
                            <th><T>Model</T></th>
                            <th><T>View</T></th>
                            <th><T>Create</T></th>
                            <th><T>Edit</T></th>
                            <th><T>Approve</T></th>
                            <th><T>Delete</T></th>
                        </tr>
                        </thead>
                        <tbody>
                        {coreCollections.map((collection) => {
                            return (
                                <tr key={collection}>
                                    <td>{collection}</td>
                                    <td>
                                        <SelectHelper name={'View_' + collection}
                                                      options={this.state.acl_types}
                                                      value={this.state.permissions[collection]
                                                             && this.state.permissions[collection].View || 'All'}
                                                      required={true}
                                                      onChange={this.handleInputChange}/>
                                    </td>
                                    <td>
                                        <SelectHelper name={'Create_' + collection}
                                                      options={this.state.acl_types}
                                                      value={this.state.permissions[collection]
                                                             && this.state.permissions[collection].Create || 'All'}
                                                      required={true}
                                                      onChange={this.handleInputChange}/>
                                    </td>
                                    <td>
                                        <SelectHelper name={'Edit_' + collection}
                                                      options={this.state.acl_types}
                                                      value={this.state.permissions[collection]
                                                             && this.state.permissions[collection].Edit || 'All'}
                                                      required={true}
                                                      onChange={this.handleInputChange}/>
                                    </td>
                                    <td>
                                        <SelectHelper name={'Approve_' + collection}
                                                      options={this.state.acl_types}
                                                      value={this.state.permissions[collection]
                                                             && this.state.permissions[collection].Approve || 'All'}
                                                      required={true}
                                                      onChange={this.handleInputChange}/>
                                    </td>
                                    <td>
                                        <SelectHelper name={'Delete_' + collection}
                                                      options={this.state.acl_types}
                                                      value={this.state.permissions[collection]
                                                             && this.state.permissions[collection].Delete || 'All'}
                                                      required={true}
                                                      onChange={this.handleInputChange}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"/>&nbsp;
                        <T>Save</T>
                    </Button>
                    <Button type="reset" size="sm" color="danger"
                            onClick={() => this.props.history.push('/manager/roles')}>
                        <i className="fa fa-ban"/> <T>Cancel</T>
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    render() {
        const {role} = this.props;

        return (
            <div className="ViewPermissions animated fadeIn">
                <PT title={role.name}/>
                <Row>
                    <Col>
                        {this.renderActionAccess(role)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderDataAccess(role)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const roleId = props.match.params._id;
    const roleSub = Meteor.subscribe('aclRoles.detail', roleId);
    const permissionsSub = Meteor.subscribe('aclPermissions.detail', roleId);
    if (roleSub.ready() && permissionsSub.ready()) {
        const role = ACLRoles.findOne(roleId);

        let permissions = {};
        let aclActions = {};
        const permissionDetail = ACLPermissions.find({roleId: roleId}).fetch();
        for (let idx in permissionDetail) {
            let permission = permissionDetail[idx];
            if (permission.Actions) {
                aclActions[permission.model] = permission.Actions;
            } else {
                permissions[permission.model] = permission;
            }
        }

        onData(null, {
            role: role,
            permissions: permissions,
            aclActions: aclActions
        });
    }
}, ViewPermissions);
