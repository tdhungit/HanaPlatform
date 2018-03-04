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

class EditView extends Component {
    render() {
        const {
            model
        } = this.props;

        return (
            <div>
                <PT title={t.__('Edit') + ' ' + model.model}/>
                <Row>
                    <Col>
                        <FormView title={t.__('Edit') + ' ' + model.model}
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
}, EditView, {loadingHandler: () => <Loading/>});
