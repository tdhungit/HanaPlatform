import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Input,
    FormGroup,
    Label
} from 'reactstrap';
import {Bert} from 'meteor/themeteorchef:bert';

import {T, t, PT} from '/imports/common/Translation';
import container from '/imports/common/Container';
import Settings from '/imports/collections/Settings/Settings';

class SystemSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const {
            settings
        } = this.props;

        if (settings) {
            this.state.settings = settings;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const name_array = name.split(':');
        const setting_category = name_array[0];
        const setting_name = name_array[1];

        let settings = this.state.settings;
        if (!settings[name]) {
            settings[name] = {};
        }

        settings[name] = {
            category: setting_category,
            name: setting_name,
            value: value
        };

        this.setState({settings: settings});
    }

    handleSubmit() {
        let updateError = false;
        for (let category in this.state.settings) {
            let setting = this.state.settings[category];
            Meteor.call('settings.update', setting, (error) => {
                 if (error) {
                     updateError = true;
                     Bert.alert(error.reason, 'danger');
                 }
            });
        }

        if (updateError == false) {
            Bert.alert(t.__('Successful!'), 'success');
        }
    }

    render() {
        return (
            <div className="settings-SystemSettings animated fadeIn">
                <PT title={t.__('System Settings')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-cogs"/>
                                <strong><T>System Settings</T></strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label><T>System title</T></Label>
                                    </Col>
                                    <Col md="9">
                                        <Input type="text" name="Systems:title"
                                               value={this.state.settings['Systems:title'] && this.state.settings['Systems:title'].value}
                                               onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label><T>List view limit</T></Label>
                                    </Col>
                                    <Col md="9">
                                        <Input type="text" name="Systems:list_view_limit"
                                               value={this.state.settings['Systems:list_view_limit'] && this.state.settings['Systems:list_view_limit'].value}
                                               onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="button" color="primary" size="sm" onClick={this.handleSubmit.bind(this)}><T>Save</T></Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

SystemSettings.defaultProps = {
    settings: {}
};

SystemSettings.propTypes = {
    settings: PropTypes.object
};

export default container((props, onData) => {
    const subscription = Meteor.subscribe('settings.getCategory');
    if (subscription && subscription.ready()) {
        const systemSettings = Settings.find({category: 'Systems'}).fetch();
        let settings = {};
        for (let idx in systemSettings) {
            let setting = systemSettings[idx];
            let key = setting.category + ':' + setting.name;
            settings[key] = setting;
        }

        onData(null, {
            settings: settings
        });
    }
}, SystemSettings);
