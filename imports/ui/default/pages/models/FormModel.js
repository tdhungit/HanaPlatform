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
import {Bert} from 'meteor/themeteorchef:bert';

import {t, T} from '/imports/common/Translation';
import {modules} from '/imports/collections/collections';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import {utilsHelper} from '../../helpers/utils/utils';

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
        } else {
            this.state.model = {status: true};
        }
    }

    handleInputChange(event) {
        let model = utilsHelper.inputChange(event, this.state.model);
        this.setState({model: model});
    }

    getVal(field) {
        if (field == 'status') {
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

        let method = 'models.insert';
        const existingRecord = this.props.model && this.props.model._id;
        if (existingRecord) {
            method = 'models.update';
        }

        if (!errorStatus) {
            Meteor.call(method, model, (error, modelId) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert(t.__('Successful!'), 'success');
                    this.props.history.push('/manager/models/' + modelId + '/detail');
                }
            });
        } else {
            Bert.alert(errorMessage, 'danger');
        }
    }

    render() {
        const existingRecord = this.props.model && this.props.model._id;

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-cogs"/>
                    <strong>{this.props.title}</strong> {this.props.slogan}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Module</T></Label>
                                <SelectHelper name="module" options={modules} placeholder={t.__('Choose...')}
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
                                <Input type="textarea" name="schema" placeholder={t.__('Enter here')} style={{height: 250}}
                                       value={this.getVal('schema')} onChange={this.handleInputChange}/>
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
