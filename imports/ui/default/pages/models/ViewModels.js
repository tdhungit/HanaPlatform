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
    static viewInfo = {controller: 'Models', action: 'List'};

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
            <div className="ViewModels">
                <PT title={t.__('View Models')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-wrench"/>
                                <strong><T>View Models</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/models/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table bordered hover>
                                    <thead>
                                    <tr>
                                        <th><T>Model</T></th>
                                        <th><T>Module</T></th>
                                        <th><T>Collection</T></th>
                                        <th><T>Status</T></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.models.map((model) => {
                                        return (
                                            <tr key={model._id}>
                                                <td>
                                                    <Link to={'/manager/models/' + model._id + '/detail'}>
                                                        {model.model}
                                                    </Link>
                                                </td>
                                                <td>{model.module}</td>
                                                <td>
                                                    <Link to={'/manager/models/' + model._id + '/detail'}>
                                                        {model.collection}
                                                    </Link>
                                                </td>
                                                <td>{model.status ?
                                                    <span className="badge badge-info">{t.__('Active')}</span>
                                                    : <span
                                                        className="badge badge-gray-200">{t.__('Inactive')}</span>}</td>
                                                <td>
                                                    <a href="javascript:void(0)"
                                                       className="btn btn-sm btn-link text-danger">
                                                        <i className="fa fa-trash"/>
                                                    </a>
                                                    <Link to={'/manager/models/' + model._id + '/detail'}
                                                          className="btn btn-sm btn-link">
                                                        <i className="fa fa-eye"/>
                                                    </Link>
                                                    <Link to={'/manager/models/' + model._id + '/edit'}
                                                          className="btn btn-sm btn-link text-warning">
                                                        <i className="fa fa-edit"/>
                                                    </Link>
                                                </td>
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
