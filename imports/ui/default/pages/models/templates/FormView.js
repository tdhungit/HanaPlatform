import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
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

import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../../helpers/utils/utils';
import {FieldInput} from '../../../components/Fields/Fields';

/**
 * a form create/edit for custom collection
 */
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

    getColumnClassName(fields) {
        let columns = _.size(fields);
        let columnClass = '12';
        if (columns == 2) {
            columnClass = '6';
        }

        return columnClass;
    }

    renderFields(fields) {
        let columnsField = [];
        const columnClass = this.getColumnClassName(fields);
        for (let fieldName in fields) {
            let field = fields[fieldName];
            field.name = fieldName;

            let placeholder = '';
            if (field.placeholder) {
                placeholder = field.placeholder;
            }

            columnsField.push(
                <Col md={columnClass} key={field.name}>
                    <FormGroup>
                        <Label><T>{field.label}</T></Label>
                        <FieldInput type={field.type} name={field.name} required={field.required || false}
                                    placeholder={placeholder}
                                    value={this.getVal(field.name)}
                                    onChange={this.handleInputChange}/>
                    </FormGroup>
                </Col>
            )
        }

        return columnsField;
    }

    renderFieldsRow(fieldsRow) {
        let fieldsRender = [];
        for (let idx in fieldsRow) {
            let fields = fieldsRow[idx];

            let row = (
                <Row key={idx}>
                    {this.renderFields(fields)}
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
            utilsHelper.alertSystem(error);
            if (!error) {
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
                    {this.renderFieldsRow(recordFields)}
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
