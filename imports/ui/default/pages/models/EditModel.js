import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {Loading} from '../../components/Loading/Loading';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import FormModel from './FormModel';

class EditModel extends Component {
    static viewInfo = {controller: 'Models', action: 'Edit'};

    render() {
        return (
            <div className="CreateModel animated fadeIn">
                <PT title={t.__('Update Model') + ': ' + this.props.model.collection}/>
                <Row>
                    <Col>
                        <FormModel title={t.__('Update Model')}
                                   slogan={this.props.model.collection} model={this.props.model}/>
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
}, EditModel, {loadingHandler: () => (<Loading/>)});
