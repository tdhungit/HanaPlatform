import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withRouter} from 'react-router';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {Roles} from 'meteor/alanning:roles';

import {T, t} from '/imports/common/Translation';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import {utilsHelper} from '../../helpers/utils/utils';

class FormUserGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userGroup: {
                name: '',
                description: '',
                parent: ''
            },
            groupRoot: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const {
            userGroup
        } = this.props;

        if (userGroup && userGroup._id) {
            this.setState({userGroup: userGroup});
        }

        Meteor.call('userGroups.ROOT', (error, response) => {
            if (!error) {
                this.setState({groupRoot: response});
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let userGroup = this.state.userGroup;
        userGroup[name] = value;

        this.setState({userGroup: userGroup});
    }

    handleSubmit() {
        const existing = this.props.userGroup && this.props.userGroup._id;
        const method = existing ? 'userGroups.update' : 'userGroups.insert';

        if (this.state.userGroup.name) {
            Meteor.call(method, this.state.userGroup, (error, groupId) => {
                utilsHelper.alertSystem(error);
                if (!error) {
                    this.props.history.push('/manager/user-groups/' + groupId + '/detail');
                }
            });
        }
    }

    render() {
        const {
            title,
            slogan,
            aclRoles
        } = this.props;

        const existing = this.props.userGroup && this.props.userGroup._id;

        return (
            <Card>
                <CardHeader>
                    <strong>{title}</strong>&nbsp;
                    {slogan}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label><T>Group name</T></Label>
                                <Input type="text" name="name"
                                       value={this.state.userGroup.name}
                                       placeholder={t.__('Enter here')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label><T>Description</T></Label>
                                <Input type="textarea" name="description"
                                       value={this.state.userGroup.description}
                                       placeholder={t.__('Enter here')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Parent</T></Label>
                                <SelectHelper name="parent" options={this.state.groupRoot}
                                              value={this.state.userGroup.parent}
                                              onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>ACL Role</T></Label>
                                <SelectHelper name="roleId" options={aclRoles}
                                              value={this.state.userGroup.roleId}
                                              onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary"
                            onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i>&nbsp;
                        {existing ? <T>Update</T> : <T>Create</T>}
                    </Button>
                    <Button type="reset" size="sm" color="danger"
                            onClick={() => this.props.history.push('/manager/user-groups')}>
                        <i className="fa fa-ban"></i> <T>Cancel</T>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(FormUserGroup);
