import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button
} from 'reactstrap';
import {Roles} from 'meteor/alanning:roles';
import {Link} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';

import {T, t, PT} from '/imports/common/Translation';

class ViewRoles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: []
        }
    }

    componentWillMount() {
        let roles = Roles.getAllRoles();
        this.setState({roles: roles});
    }

    deleteRole(roleName) {
        Roles.deleteRole(roleName);
        Bert.alert(t.__('Successful!'), 'success');
        let roles = Roles.getAllRoles();
        this.setState({roles: roles});
    }

    render() {
        return (
            <div className="acl-ViewRoles animated fadeIn">
                <PT title={t.__('View Roles')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong><T>View Roles</T></strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover className="table-outline">
                                    <thead>
                                    <tr>
                                        <th><T>Role name</T></th>
                                        <th><T>Action</T></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.roles.map((role) => {
                                        return (
                                            <tr key={role.name}>
                                                <td>{role.name}</td>
                                                <td>
                                                    <Button type="button" size="sm" color="primary">
                                                        <Link to={'/manager/roles/' + role.name + '/permissions'}>
                                                            <T>Permissions</T>
                                                        </Link>
                                                    </Button>
                                                    <Button type="button" size="sm" color="danger" onClick={this.deleteRole.bind(this, role.name)}>
                                                        <T>Delete</T>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewRoles;
