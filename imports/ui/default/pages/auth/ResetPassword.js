import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Card, CardBody,
    Button,
    Input,
    InputGroup
} from 'reactstrap';

import {T, t, PT} from '/imports/common/Translation';

class ResetPassword extends Component {
    render() {
        return (
            <div className="ResetPassword app flex-row align-items-center">
                <PT title={t.__('Reset password your account')}/>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1><T>Reset Password</T></h1>
                                    <p className="text-muted"><T>Reset password your account</T></p>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-lock"></i>
                                            </span>
                                        </div>
                                        <Input type="password" placeholder={t.__("Password")}/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="icon-lock"></i>
                                            </span>
                                        </div>
                                        <Input type="password" placeholder={t.__("Repeat password")}/>
                                    </InputGroup>
                                    <Button color="success" block><T>Change Password</T></Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ResetPassword;
