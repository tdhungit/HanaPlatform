import React, {Component} from 'react';
import {Accounts} from 'meteor/accounts-base';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button,
    Input,
    InputGroup,
    Alert
} from 'reactstrap';

import {T, t, PT} from '/imports/common/Translation';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            username: '',
            email: '',
            password: '',
            password_confirm: '',
            first_name: '',
            last_name: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSignup(event) {
        event.preventDefault();
        if (this.state.password.trim() == this.state.password_confirm.trim()) {
            Accounts.createUser({
                username: this.state.username.trim(),
                email: this.state.email.trim(),
                password: this.state.password.trim(),
                profile: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name
                }
            }, (error) => {
                if (error) {
                    this.setState({error: error});
                } else {
                    this.props.history.push('/login');
                }
            });
        }
    }

    render() {
        return (
            <div className="Signup app flex-row align-items-center">
                <PT title={t.__('Signup')}/>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1><T>Register</T></h1>
                                    <p className="text-muted"><T>Create your account</T></p>
                                    {this.state.error ? <Alert color="danger">{this.state.error}</Alert> : null}
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-user"></i>
                                            </span>
                                        </div>
                                        <Input type="text" name="username" placeholder={t.__("Username")}
                                               onChange={this.handleInputChange}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <Input type="text" name="email" placeholder={t.__("Email")}
                                               onChange={this.handleInputChange}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-lock"></i>
                                            </span>
                                        </div>
                                        <Input type="password" name="password" placeholder={t.__("Password")}
                                               onChange={this.handleInputChange}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-lock"></i>
                                            </span>
                                        </div>
                                        <Input type="password" name="password_confirm"
                                               placeholder={t.__("Repeat password")} onChange={this.handleInputChange}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-user"></i>
                                            </span>
                                        </div>
                                        <Input type="text" name="first_name" placeholder={t.__("First name")}
                                               onChange={this.handleInputChange}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-user"></i>
                                            </span>
                                        </div>
                                        <Input type="text" name="last_name" placeholder="Last name"
                                               onChange={this.handleInputChange}/>
                                    </InputGroup>
                                    <Button color="success" block onClick={this.handleSignup}><T>Create
                                        Account</T></Button>
                                </CardBody>
                                <CardFooter className="p-4">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-facebook" block><span>facebook</span></Button>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Button className="btn-twitter" block><span>twitter</span></Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Signup;
