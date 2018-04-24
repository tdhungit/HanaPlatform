import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Input
} from 'reactstrap';
import {Bert} from 'meteor/themeteorchef:bert';

import {t, T, PT} from '/imports/common/Translation';
import Settings from '/imports/collections/Settings/Settings';
import {AppListStrings} from '/imports/common/AppListStrings';

class AppListStringsSettings extends Component {
    static viewInfo = {controller: 'Settings', action: 'Edit'};

    constructor(props) {
        super(props);

        this.state = {
            AppListStrings: {},
            isAddListString: false,
            dropdownName: '',
            dropdownLabel: '',
            dropdownValue: '',
            listString: {}
        };

        this.addListStringValue = this.addListStringValue.bind(this);
        this.saveListString = this.saveListString.bind(this);
    }

    componentWillMount() {
        let allAppListStrings = AppListStrings;
        const appListStrings = Settings.find({category: 'AppListStrings'}).fetch();
        for (let idx in appListStrings) {
            let appListString = appListStrings[idx];
            allAppListStrings[appListString.name] = JSON.parse(appListString.value);
        }

        this.state.AppListStrings = allAppListStrings;
    }

    addListStringValue() {
        if (this.state.dropdownValue && this.state.dropdownLabel) {
            let listString = this.state.listString;
            listString[this.state.dropdownValue] = this.state.dropdownLabel;
            this.setState({
                listString: listString,
                dropdownLabel: '',
                dropdownValue: ''
            });
        }
    }

    removeListStringValue(value) {
        let listString = this.state.listString;
        delete listString[value];
        this.setState({listString: listString});
    }

    saveListString() {
        let setting = {};
        setting.category = 'AppListStrings';
        if (this.state.dropdownName) {
            setting.name = this.state.dropdownName;
            setting.value = JSON.stringify(this.state.listString);

            Meteor.call('settings.update', setting, (error, settingId) => {
                if (error) {
                    console.log(error);
                    Bert.alert(t.__('Error! Please contact with Admin'), 'danger');
                } else {
                    let allAppListStrings = this.state.AppListStrings;
                    allAppListStrings[this.state.dropdownName] = this.state.listString;
                    this.setState({
                        AppListStrings: allAppListStrings,
                        dropdownName: '',
                        listString: {},
                        isAddListString: false
                    });

                    Bert.alert(t.__('Successful'), 'success');
                }
            });
        }
    }

    renderListStringValueTmp() {
        let renderValueList = [];
        for (let value in this.state.listString) {
            let label = this.state.listString[value];
            renderValueList.push(
                <Row key={value} style={{marginBottom: 10}}>
                    <Col md="6">{value}</Col>
                    <Col md="5">{label}</Col>
                    <Col md="1">
                        <Button type="button" size="sm" color="icon" onClick={() => this.removeListStringValue(value)}>
                            <i className="fa fa-remove"/>
                        </Button>
                    </Col>
                </Row>
            );
        }

        return renderValueList;
    }

    renderFormAddListString() {
        return (
            <tfoot>
            <tr>
                <td>
                    <Input type="text"
                           placeholder={t.__('Enter dropdown key')}
                           onChange={(event) => this.setState({dropdownName: event.target.value})}
                           value={this.state.dropdownName}/>
                    <Button type="button" color="primary" style={{marginTop: 5}} onClick={this.saveListString}>
                        <i className="fa fa-save"/> <T>Save</T>
                    </Button>
                    <Button type="button" color="danger" style={{marginTop: 5}}
                            onClick={() => this.setState({
                                dropdownName: '',
                                listString: {},
                                isAddListString: false
                            })}>
                        <i className="fa fa-ban"/> <T>Cancel</T>
                    </Button>
                </td>
                <td>
                    {this.renderListStringValueTmp()}
                    <Row>
                        <Col md="6">
                            <Input type="text"
                                   placeholder={t.__('Enter dropdown value')}
                                   onChange={(event) => this.setState({dropdownValue: event.target.value})}
                                   value={this.state.dropdownValue}/>
                        </Col>
                        <Col md="5">
                            <Input type="text"
                                   placeholder={t.__('Enter dropdown label')}
                                   onChange={(event) => this.setState({dropdownLabel: event.target.value})}
                                   value={this.state.dropdownLabel}/>
                        </Col>
                        <Col md="1">
                            <Button type="button" onClick={this.addListStringValue}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </Col>
                    </Row>
                </td>
            </tr>
            </tfoot>
        );
    }

    renderValueList(listStringValue) {
        let renderValueList = [];
        for (let value in listStringValue) {
            let label = listStringValue[value];
            renderValueList.push(
                <Row key={value}>
                    <Col md="6">{value}</Col>
                    <Col md="6">{label}</Col>
                </Row>
            );
        }

        return renderValueList;
    }

    renderList() {
        let renderAppListStrings = [];
        for (let listStringKey in this.state.AppListStrings) {
            let listStringValue = this.state.AppListStrings[listStringKey];
            renderAppListStrings.push(
                <tr key={listStringKey}>
                    <td>{listStringKey}</td>
                    <td>
                        {this.renderValueList(listStringValue)}
                    </td>
                </tr>
            );
        }

        return renderAppListStrings;
    }

    render() {
        return (
            <div className="AppListStringsSettings animated fadeIn">
                <PT title={t.__('Config Dropdown List')}/>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-cogs"/>
                                <strong><T>Dropdown List</T></strong>
                                <div className="card-actions">
                                    <Button type="button" onClick={() => this.setState({isAddListString: true})}>
                                        <i className="fa fa-plus-circle"/>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                    <tr>
                                        <th><T>Dropdown Name</T></th>
                                        <th><T>Dropdown List</T> (value => label)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderList()}
                                    </tbody>
                                    {this.state.isAddListString ? this.renderFormAddListString() : null}
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AppListStringsSettings;