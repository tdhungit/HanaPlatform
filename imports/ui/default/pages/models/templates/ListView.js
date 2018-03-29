import React, {Component} from 'react';
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
import {t, T, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import ListViewTable from './ListViewTable';

/**
 * list for custom collection
 */
class ListView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {}
        }
    }

    componentWillMount() {
        const modelName = this.props.match.params._model;
        this.state.model = Models.findOne({model: modelName});
        const model = this.state.model;
        if (model._id) {
            const collection = myModel.getCollection(model.model);

            this.limit = collection.getLimit();
            this.pagination = collection.pagination();
        }
    }

    render() {
        const model = this.state.model;
        if (!model._id) {
            return <Alert color="danger"><T>No Data</T></Alert>;
        }

        return (
            <div className="module-ListView animated fadeIn">
                <PT title={model.model + ' ' + t.__('List')}/>
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

export default ListView;