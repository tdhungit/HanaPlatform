import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {T, t, PT} from '/imports/common/Translation';
import FormMainMenu from './FormMainMenu';
import MainMenus from '/imports/collections/MainMenus/MainMenus';

class EditMainMenu extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {
            menu
        } = this.props;

        return (
            <div className="mainmenu-EditMainMenu animated fadeIn">
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

EditMainMenu.defaultProps = {
    menu: {}
};

EditMainMenu.propTypes = {
    menu: PropTypes.object
};

export default container((props, onData) => {
    const menuId = props.match.params._id;
    const subscription = Meteor.subscribe('mainMenus.detail', menuId);
    if (subscription && subscription.ready()) {
        onData(null, {
            menu: MainMenus.findOne(menuId)
        })
    };
}, EditMainMenu);
