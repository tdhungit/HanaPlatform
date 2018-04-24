import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import FormMainMenu from './FormMainMenu';
import MainMenus from '/imports/collections/MainMenus/MainMenus';

class EditMainMenu extends Component {
    static viewInfo = {controller: 'MainMenus', action: 'Edit'};

    constructor(props) {
        super(props);
    }

    render() {
        const {
            menu
        } = this.props;

        return (
            <div className="EditMainMenu animated fadeIn">
                <PT title={menu.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <FormMainMenu menu={menu} title={t.__("Edit menu")} slogan={t.__("Sidebar menu")}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const menuId = props.match.params._id;
    const subscription = Meteor.subscribe('mainMenus.detail', menuId);
    if (subscription && subscription.ready()) {
        onData(null, {
            menu: MainMenus.findOne(menuId)
        });
    }
}, EditMainMenu);
