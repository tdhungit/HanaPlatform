import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';

import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../../helpers/utils/utils';
import {FieldInput} from '../../../components/Fields/Fields';

class FormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            record: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        if (this.props.record) {
            this.state.record = this.props.record;
        }
    }

    handleInputChange(event) {
        const object = utilsHelper.inputChange(event, this.state.record);
        this.setState({record: object});
    }

    getVal(field) {
        return utilsHelper.getField(this.state.record, field, '');
    }

    renderFields(fields) {
        let fieldsRender = [];
        for (let fieldName in fields) {
            let field = fields[fieldName];
            let row = (
                <Row key={fieldName}>
                    <Col>
                        <FormGroup>
                            <Label><T>{field.label}</T></Label>
                            <FieldInput type={field.type} name={fieldName} required={field.required || false}
                                           value={this.getVal(fieldName)}
                                           onChange={this.handleInputChange}/>
                        </FormGroup>
                    </Col>
                </Row>
            );

            fieldsRender.push(row);
        }

        return fieldsRender;
    }

    handleSubmit() {
        const {
            model,
            record
        } = this.props;

        let method = 'models.insertRecord';
        const existingRecord = record && record._id;
        if (existingRecord) {
            method = 'models.updateRecord';
        }

        Meteor.call(method, model.model, this.state.record, (error, recordId) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert(t.__('Successful'), 'success');
                this.props.history.push('/manager/model/' + model.model + '/' + recordId + '/detail');
            }
        });
    }

    render() {
        const {
            model,
            record
        } = this.props;

        const existingRecord = record && record._id;
        const recordFields = model.view.fields;

        return (
            <Card>
                <CardHeader>
                    <i className={model.icon}/>
                    <strong>{this.props.title}</strong> {this.props.slogan}
                </CardHeader>
                <CardBody>
                    {this.renderFields(recordFields)}
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i> <T>{existingRecord ? 'Update' : 'Create'}</T>
                    </Button>
                    <Button type="button" size="sm" color="danger">
                        {existingRecord
                            ?
                            <Link to={'/manager/model/' + model.model + '/' + record._id + '/detail'}>
                                <i className="fa fa-ban"></i> <T>Cancel</T>
                            </Link>
                            :
                            <Link to={'/manager/model/' + model.model + '/list'}>
                                <i className="fa fa-ban"></i> <T>Cancel</T>
                            </Link>
                        }
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(FormView);
