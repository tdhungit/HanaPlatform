import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import FormModel from './FormModel';

class CreateModel extends Component {
    render() {
        return (
            <div className="models-CreateModel animated fadeIn">
                <PT title={t.__('Create new Model')}/>
                <Row>
                    <Col>
                        <FormModel title={t.__('Create new Model')} slogan="" model={{}}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateModel;
