import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

import {T, t} from '/imports/common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import {AppListStrings} from '/imports/common/AppListStrings';

class UserSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const currentUser = Meteor.user();
        this.state.settings = currentUser.settings || {};
    }

    getValue(key) {
        return this.state.settings[key] || '';
    }

    handleInputChange(event) {
        const settings = utilsHelper.inputChange(event, this.state.settings);
        this.setState({settings: settings});
    }

    handleSubmit() {
        const currentUser = Meteor.user();
        const user = {_id: currentUser._id, settings: this.state.settings};
        console.log(user);
        Meteor.call('users.update', user, (error, userId) => {
            utilsHelper.alertSystem(error);
        });
    }

    render() {
        // const currentUser = Meteor.user();

        return (
            <Card>
                <CardBody>
                    <FormGroup row>
                        <Col md="3">
                            <Label><T>Full Name</T></Label>
                        </Col>
                        <Col md="9">
                            <Input type="select" name="fullName" value={this.getValue('fullName')}
                                   onChange={this.handleInputChange}>
                                <option value=""></option>
                                <option value="FL">First name - last name</option>
                                <option value="LF">Last name - first name</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label><T>Date Format</T></Label>
                        </Col>
                        <Col md="9">
                            <SelectHelper options={AppListStrings.DateFormatList} name="dateFormat"
                                          value={this.getValue('dateFormat')}
                                          onChange={this.handleInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                            <Label><T>DateTime Format</T></Label>
                        </Col>
                        <Col md="9">
                            <SelectHelper options={AppListStrings.DateTimeFormatList} name="dateTimeFormat"
                                          value={this.getValue('dateTimeFormat')}
                                          onChange={this.handleInputChange}/>
                        </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col md="3"></Col>
                        <Col md="9">
                            <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                                <i className="fa fa-dot-circle-o"></i> <T>Save</T>
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(UserSettings);
