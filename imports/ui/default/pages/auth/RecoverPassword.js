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

class RecoverPassword extends Component {
    render() {
        return (
            <div className="RecoverPassword app flex-row align-items-center">
                <PT title={t.__('Forgot Password')}/>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1><T>Recover Password</T></h1>
                                    <p className="text-muted"><T>Forgot Password</T></p>
                                    <InputGroup className="mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <Input type="text" placeholder={t.__("Email")}/>
                                    </InputGroup>
                                    <Button color="success" block><T>Send</T></Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RecoverPassword;
