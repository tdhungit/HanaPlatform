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
            model: {
                status: true
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        let model = utilsHelper.inputChange(event, this.state.model);
        this.setState({model: model});
    }

    handleSubmit() {
        let model = this.state.model;
        let errorStatus = false;
        let errorMessage = '';

        model.schemaString = model.schemaString.replace(/\r?\n/g, '<br />');
        if (model.schemaString) {
            try {
                model.schema = JSON.parse(model.schemaString);
            } catch (error) {
                errorStatus = false;
                errorMessage = error.message;
            }
        }

        console.log(model);

        if (errorStatus) {
            Meteor.call('models.insert', this.state.model, (error, modelId) => {
                console.log(error);
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
                                              onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Collection</T></Label>
                                <Input type="text" name="collection" placeholder={t.__('Enter here')} required
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label><T>Status</T></Label>
                                <Input type="select" name="status"
                                       onChange={this.handleInputChange}>
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
                                <Input type="textarea" name="schemaString" placeholder={t.__('Enter here')} style={{height: 400}}
                                       onChange={this.handleInputChange}/>
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
