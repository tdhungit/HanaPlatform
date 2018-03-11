import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label
} from 'reactstrap';

import {t, T, PT} from '/imports/common/Translation';
import {Form, FieldInput , FieldButton, RForm, RFieldInput, RFieldButton} from '../../components/Fields/Fields';

class Dashboard extends Component {
    render() {
        return (
            <div className="index-Dashboard animated fadeIn">
                <PT title={t.__('Dashboard')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-dashboard"/>
                                <strong><T>Dashboard</T></strong>
                            </CardHeader>
                            <CardBody>
                                <a href="javascript:void(0)" onClick={() => this.props.appLoading()}>Loading</a>
                                <br/>
                                <a href="javascript:void(0)" onClick={() => this.props.appLoading(false)}>Loaded</a>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-dashboard"/>
                                <strong>Form</strong>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>TEST</Label>
                                                <FieldInput name="test"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FieldButton label="Submit" color="primary"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-dashboard"/>
                                <strong>Redux Form</strong>
                            </CardHeader>
                            <CardBody>
                                <RForm name="Jacky">
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Test</Label>
                                                <RFieldInput name="textr" validate={['required', 'email']}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <RFieldButton label="Submit" color="primary"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </RForm>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
