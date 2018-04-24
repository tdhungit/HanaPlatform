import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import FormModel from './FormModel';

class CreateModel extends Component {
    static viewInfo = {controller: 'Models', action: 'Create'};

    render() {
        return (
            <div className="CreateModel animated fadeIn">
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
