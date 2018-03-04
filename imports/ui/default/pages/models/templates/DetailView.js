import React, {Component} from 'react';
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

class DetailView extends Component {
    render() {
        return (
            <div>
                <PT title={this.props.model + ' ' + t.__('Detail')}/>
                <Row>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-eye"/>
                            <strong>{this.props.model} <T>Detail</T>: </strong>
                        </CardHeader>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const model = props.match.params._model;
    onData(null, {
        model: model
    })
}, DetailView, {loadingHandler: () => <Loading/>});
