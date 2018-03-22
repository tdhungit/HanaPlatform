import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Loading from '../../../components/Loading/Loading';
import Models from '/imports/collections/Models/Models';
import {myModel} from '/imports/common/Model';
import {FieldDetail} from '../../../components/Fields/Fields';

/**
 * detail a record for custom collection
 */
class DetailView extends Component {
    renderFields(model, record) {
        let fieldRender = [];
        for (let fieldName in model.view.fields) {
            let field = model.view.fields[fieldName];
            field.name = fieldName;
            fieldRender.push(
                <FieldDetail key={fieldName} field={field} record={record}/>
            );
        }

        return fieldRender;
    }

    render() {
        const {
            model,
            record
        } = this.props;

        if (!model || !model._id || !record) {
            return <Alert color="danger"><T>No Data</T></Alert>;
        }

        const title = record[model.view.title];
        return (
            <div>
                <PT title={title}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className={model.icon}/>
                                <strong>{model.model} <T>Detail</T></strong> {title}
                                <div className="card-actions">
                                    <Link to={'/manager/model/' + model.model + '/' + record._id + '/edit'} title={t.__('Edit')}>
                                        <i className="fa fa-edit"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody className="title">
                                {this.renderFields(model, record)}
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
    const recordId = props.match.params._id;
    const collection = myModel.getCollection(modelName);
    const sub = Meteor.subscribe('models.detailRecord', modelName, recordId);
    if (sub.ready()) {
        onData(null, {
            model: Models.findOne({model: modelName}),
            record: collection.findOne(recordId)
        });
    }
}, DetailView, {loadingHandler: () => <Loading/>});
