import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
import {Bert} from 'meteor/themeteorchef:bert';

import {T, t} from '/imports/common/Translation';

class FormRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: {
                name: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let role = this.state.role;
        role[name] = value;

        this.setState({role: role});
    }

    handleSubmit() {
        if (this.state.role.name) {
            let roleId = Roles.createRole(this.state.role.name);
            if (roleId) {
                Bert.alert(t.__('Successful!'), 'success');
            } else {
                Bert.alert(t.__('Error! Please try again'), 'error');
            }
        }
    }

    render() {
        const {
            title,
            slogan
        } = this.props;

        const existing = this.props.menu && this.props.menu._id;

        return (
            <Card>
                <CardHeader>
                    <strong>{title}</strong>&nbsp;
                    {slogan}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Role name</T></Label>
                                <Input type="text" name="name" value={this.state.role.name} placeholder={t.__('Enter here')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i>&nbsp;
                        {existing ? <T>Update</T> :<T>Create</T>}
                    </Button>
                    <Button type="reset" size="sm" color="danger" onClick={() => this.props.history.push('/manager/roles')}>
                        <i className="fa fa-ban"></i> <T>Cancel</T>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

FormRole.defaultProps = {
    title: '',
    slogan: '',
    role: {}
};

FormRole.propTypes = {
   title: PropTypes.string,
   slogan: PropTypes.string,
   role: PropTypes.object
};

export default withRouter(FormRole);
