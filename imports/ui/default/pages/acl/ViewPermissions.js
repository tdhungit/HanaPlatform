import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Table,
    Button,
    Input,
    Label
} from 'reactstrap';
import {Meteor} from 'meteor/meteor';

import {coreCollections} from '/imports/collections/collections';
import {permissionsAclTypes} from '/imports/collections/ACLPermissions/config';
import ACLPermissions from '/imports/collections/ACLPermissions/ACLPermissions';
import ACLRoles from '/imports/collections/ACLRoles/ACLRoles';
import {T, t, PT} from '/imports/common/Translation';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import container from '/imports/common/Container';
import {Bert} from 'meteor/themeteorchef:bert';

class ViewPermissions extends Component {
    static propTypes = {
        role: PropTypes.object,
        permissions: PropTypes.object
    };

    static defaultProps = {
        role: {},
        permissions: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            acl_types: permissionsAclTypes,
            permissions: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const {permissions} = this.props;

        if (permissions) {
            this.state.permissions = permissions;
        }

        for (let idx in coreCollections) {
            let collection = coreCollections[idx];
            if (!this.state.permissions[collection]) {
                this.state.permissions[collection] = {Access: false};
            }
        }
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

        Meteor.call('aclPermissions.update', this.state.permissions, role._id, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(t.__('Successful!'), 'success');
            }
        });
    }

    render() {
        const {role} = this.props;

        return (
            <div className="ViewPermissions animated fadeIn">
                <PT title={role.name}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-key"/>
                                <strong><T>View Permission</T></strong>&nbsp;
                                {role.name}
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover className="table-outline">
                                    <thead>
                                    <tr>
                                        <th><T>Model</T></th>
                                        <th><T>Access</T></th>
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
                                                    <Label className="switch switch-text switch-pill switch-primary">
                                                        <Input type="checkbox" name={'Access_' + collection}
                                                               className="switch-input"
                                                               checked={(this.state.permissions[collection] && this.state.permissions[collection].Access) ? true : false}
                                                               onChange={this.handleInputChange}/>
                                                        <span className="switch-label" data-on="On" data-off="Off"/>
                                                        <span className="switch-handle"/>
                                                    </Label>
                                                </td>
                                                <td>
                                                    <SelectHelper name={'View_' + collection}
                                                                  options={this.state.acl_types}
                                                                  value={this.state.permissions[collection] && this.state.permissions[collection].View}
                                                                  onChange={this.handleInputChange}/>
                                                </td>
                                                <td>
                                                    <SelectHelper name={'Create_' + collection}
                                                                  options={this.state.acl_types}
                                                                  value={this.state.permissions[collection] && this.state.permissions[collection].Create}
                                                                  onChange={this.handleInputChange}/>
                                                </td>
                                                <td>
                                                    <SelectHelper name={'Edit_' + collection}
                                                                  options={this.state.acl_types}
                                                                  value={this.state.permissions[collection] && this.state.permissions[collection].Edit}
                                                                  onChange={this.handleInputChange}/>
                                                </td>
                                                <td>
                                                    <SelectHelper name={'Approve_' + collection}
                                                                  options={this.state.acl_types}
                                                                  value={this.state.permissions[collection] && this.state.permissions[collection].Approve}
                                                                  onChange={this.handleInputChange}/>
                                                </td>
                                                <td>
                                                    <SelectHelper name={'Delete_' + collection}
                                                                  options={this.state.acl_types}
                                                                  value={this.state.permissions[collection] && this.state.permissions[collection].Delete}
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
        const permissionDetail = ACLPermissions.find({roleId: roleId}).fetch();
        for (let idx in permissionDetail) {
            let permission = permissionDetail[idx];
            permissions[permission.model] = permission;
        }

        onData(null, {
            role: role,
            permissions: permissions
        });
    }
}, ViewPermissions);
