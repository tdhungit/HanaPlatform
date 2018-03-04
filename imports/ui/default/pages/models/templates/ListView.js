import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {myModel} from '/imports/common/Model';
import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Loading from '../../../components/Loading/Loading';
import {FieldEditView} from '../../../components/Fields/FieldView';

class ListView extends Component {
    onChange() {

    }
    render() {
        const testCollection = myModel.getCollection('Activities');
        return (
            <div className="module-ListView animated fadeIn">
                <PT titile={this.props.model + ' ' + t.__('List')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <strong>{this.props.model} <T>List</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/model/' + this.props.model + '/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <FieldEditView type="texteditor" name="test" onChange={this.onChange.bind(this)}/>
                            </CardBody>
                        </Card>
                    </Col>
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
}, ListView, {loadingHandler: () => <Loading/>});
