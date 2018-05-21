import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Button
} from 'reactstrap';

import {t, T, PT} from '/imports/common/Translation';
import {Form, FieldInput, FieldButton, RForm, RFieldInput, RFieldButton} from '../../components/Fields/Fields';
import {utilsHelper} from '../../helpers/utils/utils';

class Dashboard extends Component {
    static viewInfo = {controller: 'Dashboard', action: 'View'};

    toast() {
        utilsHelper.toast('Toast Message');
        utilsHelper.toastInfo('Toast Message');
        utilsHelper.toastSuccess('Toast Message');
        utilsHelper.toastWarning('Toast Message');
        utilsHelper.toastError('Toast Message');
    }

    renderAppLoading() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-dashboard"/>
                    <strong><T>Dashboard</T></strong>
                </CardHeader>
                <CardBody>
                    <a href="javascript:void(0)" onClick={() => this.props.appLoading()}>Loading</a>
                    <br/>
                    <a href="javascript:void(0)" onClick={() => this.props.appLoading(false)}>Loaded</a>
                    <br/>
                    <Button onClick={() => this.toast()}>Toast</Button>
                </CardBody>
            </Card>
        );
    }

    renderForm() {
        return (
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
                                    <FieldInput name="test" validate={['required', 'email']}/>
                                </FormGroup>
                                <FormGroup>
                                    <FieldButton label="Submit" color="primary"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        );
    }

    renderReduxForm() {
        return (
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
        );
    }

    render() {
        return (
            <div className="Dashboard animated fadeIn">
                <PT title={t.__('Dashboard')}/>
                <Row>
                    <Col>
                        {this.renderAppLoading()}
                        {this.renderForm()}
                        {this.renderReduxForm()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;
