import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {T, t, PT} from '/imports/common/Translation';
import FormMainMenu from './FormMainMenu';

class CreateMainMenu extends Component {
    static viewInfo = {controller: 'MainMenus', action: 'Create'};

    render() {
        return (
            <div className="CreateMainMenu animated fadeIn">
                <PT title={t.__('Create new menu')}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormMainMenu title={t.__("Create new menu")} slogan={t.__("Sidebar menu")}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateMainMenu;
