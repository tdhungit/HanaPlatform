import React, {Component} from 'react';
import {
    Row,
    Col,
    Alert
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import {Loading} from '../../../components/Loading/Loading';
import FormView from './FormView';
import Models from '/imports/collections/Models/Models';

/**
 * create a record for custom collection
 */
class CreateView extends Component {
    render() {
        const {
            model
        } = this.props;

        if (!model) {
            return (
                <div>
                    <PT title={t.__('404')}/>
                    <Row>
                        <Col>
                            <Alert color="danger"><T>Can not found</T>: {this.props.match.params._model} Module</Alert>
                        </Col>
                    </Row>
                </div>
            );
        }

        return (
            <div>
                <PT title={t.__('Create new') + ' ' + model.model}/>
                <Row>
                    <Col>
                        <FormView title={t.__('Create new') + ' ' + model.model}
                                  slogan="" model={model} record={{}}/>
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
}, CreateView, {loadingHandler: () => <Loading/>});
