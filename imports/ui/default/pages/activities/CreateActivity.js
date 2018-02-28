import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {T, t, PT} from '/imports/common/Translation';
import FormActivity from './FormActivity';

class CreateActivity extends Component {
    render() {
        return (
            <div className="activities-CreateActivities animated fadeIn">
                <PT title={t.__('Create new activity')}/>
                <Row>
                    <Col>
                        <FormActivity title={t.__('Create new activity')} slogan=""/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateActivity;
