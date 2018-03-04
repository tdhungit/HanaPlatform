import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Loading from '../../components/Loading/Loading';
import FormView from './FormView';

class EditView extends Component {
    render() {
        return (
            <div>
                <PT title={t.__('Edit') + ' ' + this.props.model}/>
                <Row>
                    <Col>
                        <FormView title={t.__('Edit') + ' ' + this.props.model}
                                  slogan="" record={{}}/>
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
}, EditView, {loadingHandler: () => <Loading/>});
