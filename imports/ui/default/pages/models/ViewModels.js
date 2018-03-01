import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table
} from 'reactstrap';
import {Link} from 'react-router-dom';

import Models from '/imports/collections/Models/Models';
import {t, T, PT} from '/imports/common/Translation';

class ViewModels extends Component {
    constructor(props) {
        super(props);

        this.state = {
            models: []
        }
    }

    componentDidMount() {
        const models = Models.find({}).fetch();
        this.setState({models: models});
    }

    render() {
        return (
            <div className="models-ViewModels">
                <PT title={t.__('View Models')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong><T>View Models</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/models/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive className="table-outline">
                                    <thead>
                                    <tr>
                                        <th><T>Module</T></th>
                                        <th><T>Collection</T></th>
                                        <th><T>Status</T></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.models.map((model) => {
                                        return (
                                            <tr>
                                                <td>{model.module}</td>
                                                <td>{model.collection}</td>
                                                <td>{model.status}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewModels;
