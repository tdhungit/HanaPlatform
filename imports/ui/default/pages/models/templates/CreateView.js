import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Loading from '../../../components/Loading/Loading';
import FormView from './FormView';
import Models from '/imports/collections/Models/Models';

class CreateView extends Component {
    render() {
        const {
            model
        } = this.props;

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
    const subModel = Meteor.subscribe('models.get', modelName);
    if (subModel.ready()) {
        onData(null, {
            model: Models.findOne({model: modelName})
        });
    }
}, CreateView, {loadingHandler: () => <Loading/>});
