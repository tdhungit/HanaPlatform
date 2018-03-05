import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {myModel} from '/imports/common/Model';
import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Loading from '../../../components/Loading/Loading';
import Models from '/imports/collections/Models/Models';
import ListViewTable from './ListViewTable';

class ListView extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const model = this.props.model;
        if (model && model._id) {
            const collection = myModel.getCollection(model.model);

            this.limit = 20;
            const limit = this.limit;
            this.pagination = new Meteor.Pagination(collection, {
                filters: {},
                sort: {},
                perPage: limit,
                reactive: true,
                debug: true
            });
        }
    }

    render() {
        const {
            model
        } = this.props;

        if (!model || !model._id) {
            return <Alert color="danger"><T>No Data</T></Alert>;
        }

        return (
            <div className="module-ListView animated fadeIn">
                <PT titile={model.model + ' ' + t.__('List')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className={model.icon}/>
                                <strong>{model.model} <T>List</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/model/' + model.model + '/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ListViewTable model={model} pagination={this.pagination} limit={this.limit}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const modelName = props.match.params._model;
    onData(null, {
        model: Models.findOne({model: modelName})
    });
}, ListView, {loadingHandler: () => <Loading/>});
