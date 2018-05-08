import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {t, T} from '/imports/common/Translation';
import {modules} from '/imports/config/collections';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import {utilsHelper} from '../../helpers/utils/utils';
import {existCollections} from '/imports/config/collections';

class FormModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        if (this.props.model) {
            this.state.model = this.props.model;
            this.state.model.list = JSON.stringify(this.state.model.list);
            this.state.model.view = JSON.stringify(this.state.model.view);
        } else {
            this.state.model = {status: true};
        }
    }

    handleInputChange(event) {
        let model = utilsHelper.inputChange(event, this.state.model);
        this.setState({model: model});
    }

    getVal(field) {
        if (field === 'status') {
            if (this.state.model._id) {
                return this.state.model.status;
            }
        }
        return this.state.model[field] || '';
    }

    handleSubmit() {
        let model = this.state.model;
        let errorStatus = false;
        let errorMessage = '';

        model.schema = model.schema.replace(/\r?\n/g, '');
        model.schema = model.schema.replace(/\s\s+/g, ' ');

        model.list = model.list.replace(/\r?\n/g, '');
        model.list = JSON.parse(model.list);
        model.view = model.view.replace(/\r?\n/g, '');
        model.view = JSON.parse(model.view);

        for (let idx in existCollections) {
            let existCollection = existCollections[idx];
            if (existCollection.toLowerCase() === model.model.toLowerCase()
                || existCollection.toLowerCase() === model.collection.toLowerCase()) {
                errorStatus = true;
                errorMessage = t.__('Exist model or collection');
            }
        }

        let method = 'models.insert';
        const existingRecord = this.props.model && this.props.model._id;
        if (existingRecord) {
            method = 'models.update';
        }

        if (!errorStatus) {
            Meteor.call(method, model, (error, modelId) => {
                utilsHelper.alertSystem(error);
                if (!error) {
                    this.props.history.push('/manager/models/' + modelId + '/detail');
                }
            });
        } else {
            utilsHelper.errorMessage(errorMessage);
        }
    }

    render() {
        const existingRecord = this.props.model && this.props.model._id;

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-wrench"/>
                    <strong>{this.props.title}</strong> {this.props.slogan}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Model</T></Label>
                                <Input type="text" name="model" placeholder={t.__('Enter here')} required
                                       value={this.getVal('model')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Module</T></Label>
                                <SelectHelper name="module" options={modules} placeholder={t.__('Choose...')} required
                                              value={this.getVal('module')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Collection</T></Label>
                                <Input type="text" name="collection" placeholder={t.__('Enter here')} required
                                       value={this.getVal('collection')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Icon</T></Label>
                                <Input type="text" name="icon" placeholder={t.__('Enter here')} required
                                       value={this.getVal('icon')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Status</T></Label>
                                <Input type="select" name="status"
                                       value={this.getVal('status')} onChange={this.handleInputChange}>
                                    <option value={true}>{t.__('Active')}</option>
                                    <option value={false}>{t.__('Inactive')}</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Schema</T></Label>
                                <Input type="textarea" name="schema" placeholder={t.__('Enter here')} required
                                       style={{height: 200}}
                                       value={this.getVal('schema')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>List View</T></Label>
                                <Input type="textarea" name="list" placeholder={t.__('Enter here')} required
                                       style={{height: 200}}
                                       value={this.getVal('list')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Record View</T></Label>
                                <Input type="textarea" name="view" placeholder={t.__('Enter here')} required
                                       style={{height: 200}}
                                       value={this.getVal('view')} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i> <T>{existingRecord ? 'Update' : 'Create'}</T>
                    </Button>
                    <Button type="button" size="sm" color="danger">
                        {existingRecord
                            ?
                            <Link to={'/manager/models/' + this.state.model._id + '/detail'}>
                                <i className="fa fa-ban"></i> <T>Cancel</T>
                            </Link>
                            :
                            <Link to={'/manager/models'}>
                                <i className="fa fa-ban"></i> <T>Cancel</T>
                            </Link>
                        }
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(FormModel);
