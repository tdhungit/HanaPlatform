import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '/imports/common/Container';
import {Loading} from '../../components/Loading/Loading';
import {t, T, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';

class ViewModel extends Component {
    static viewInfo = {controller: 'Models', action: 'View'};

    constructor(props) {
        super(props);

        this.state = {
            model: {}
        }
    }

    componentWillMount() {
        if (this.props.model) {
            this.state.model = this.props.model;
            this.state.model.list = JSON.stringify(this.state.model.list);
            this.state.model.view = JSON.stringify(this.state.model.view);
        }
    }

    render() {
        return (
            <div className="ViewModel animated fadeIn">
                <PT title={this.state.model.collection}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-wrench"/>
                                <strong>{this.state.model.collection}</strong>
                                <div className="card-actions">
                                    <Link to={'/manager/models/' + this.state.model._id + '/edit'} title={t.__('Edit')}>
                                        <i className="fa fa-edit"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody className="detail">
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Model</T></dt>
                                    <dd className="col-sm-9">{this.state.model.model}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Module</T></dt>
                                    <dd className="col-sm-9">{this.state.model.module}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Collection</T></dt>
                                    <dd className="col-sm-9">{this.state.model.collection}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Icon</T></dt>
                                    <dd className="col-sm-9">{this.state.model.icon}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Status</T></dt>
                                    <dd className="col-sm-9">
                                        {this.state.model.status ?
                                            <span className="badge badge-blue">{t.__('Active')}</span> :
                                            <span className="badge badge-danger">{t.__('Inactive')}</span>}
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Schema</T></dt>
                                    <dd className="col-sm-9">{this.state.model.schema}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>List View</T></dt>
                                    <dd className="col-sm-9">{this.state.model.list}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3"><T>Record View</T></dt>
                                    <dd className="col-sm-9">{this.state.model.view}</dd>
                                </dl>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const modelId = props.match.params._id;
    onData(null, {
        model: Models.findOne(modelId)
    });
}, ViewModel, {loadingHandler: () => (<Loading/>)});
