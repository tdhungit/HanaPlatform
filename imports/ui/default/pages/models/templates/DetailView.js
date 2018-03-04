import React, {Component} from 'react';
import {Meteor} from "meteor/meteor";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Loading from '../../../components/Loading/Loading';
import Models from '/imports/collections/Models/Models';

class DetailView extends Component {
    render() {
        const {
            model
        } = this.props;

        return (
            <div>
                <PT title={model.model + ' ' + t.__('Detail')}/>
                <Row>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-eye"/>
                            <strong>{model.model} <T>Detail</T>: </strong>
                        </CardHeader>
                    </Card>
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
}, DetailView, {loadingHandler: () => <Loading/>});
