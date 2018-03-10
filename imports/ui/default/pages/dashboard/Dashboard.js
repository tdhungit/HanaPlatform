import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import {t, T, PT} from '/imports/common/Translation';
import {Form, FieldInput, RForm, RFieldInput} from '../../components/Fields/Fields';

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
                                    <FieldInput name="test"/>
                                </Form>

                                <RForm name="Jacky">
                                    <RFieldInput name="textr"/>
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
