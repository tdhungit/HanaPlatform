import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Container,
    Row,
    Col,
    CardGroup,
    Card, CardBody,
    Button,
    Input,
    InputGroup
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {T, t, PT} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin() {
        Meteor.loginWithPassword(this.state.username, this.state.password, (error) => {
            if (error) {
                utilsHelper.alertError(error);
            } else {
                this.props.history.push('/manager');
            }
        });
    }

    render() {
        return (
            <div className="Login app flex-row align-items-center">
                <PT title={t.__('Login')}/>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1><T>Login</T></h1>
                                        <p className="text-muted"><T>Sign In to your account</T></p>
                                        <span className="text-muted">
                                            <T>Sign with @username.@domain.</T>
                                        </span>
                                        <br/>
                                        <span className="text-muted">Example: admin.up5.vn</span>
                                        <InputGroup className="mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-user"></i>
                                                </span>
                                            </div>
                                            <Input type="text" name="username" placeholder={t.__("Username")}
                                                   value={this.state.username} onChange={this.handleInputChange}/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="icon-lock"></i>
                                                </span>
                                            </div>
                                            <Input type="password" name="password" placeholder={t.__("Password")}
                                                   value={this.state.password} onChange={this.handleInputChange}/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4" type="button"
                                                        onClick={this.handleLogin.bind(this)}><T>Login</T></Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0">
                                                    <Link to="/recover-password"><T>Forgot password?</T></Link>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2><T>Sign up</T></h2>
                                            <p><T>New Employee please contact with administrator</T></p>
                                            <Button type="button" color="primary" className="mt-3" active>
                                                <Link to="/signup"><T>Register Now!</T></Link>
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;
