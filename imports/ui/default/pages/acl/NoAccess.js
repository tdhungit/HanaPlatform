import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Alert
} from 'reactstrap';

import {t, T, PT} from '/imports/common/Translation';

class NoAccess extends Component {
    render() {
        return (
            <Container>
                <PT title={t.__('No Access')}/>
                <div className="NoAccess animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-ban"/>
                                    <strong><T>Can not access</T></strong>
                                </CardHeader>
                                <CardBody>
                                    <Alert color="danger">
                                        <T>You can not access this page. Please contact with Administrator.</T>
                                    </Alert>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default NoAccess;
