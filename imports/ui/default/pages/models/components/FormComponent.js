import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import _ from 'underscore';
import PropTypes from 'prop-types';
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
    Button,
    Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {vsprintf} from 'sprintf-js';

import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../../helpers/utils/utils';
import {FieldInput} from '../../../components/Fields/Fields';

/**
 * a tag form for create/edit a record
 */
class FormComponent extends Component {
    static propTypes = {
        model: PropTypes.object,
        record: PropTypes.object,
        title: PropTypes.string,
        slogan: PropTypes.string,
        detailLink: PropTypes.string,
        listLink: PropTypes.string,
        onSubmit: PropTypes.func,
        method: PropTypes.string,
        component: PropTypes.func,
        helpers: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            record: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.state.record = this.props.record;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.record !== nextProps.record) {
            this.setState({record: nextProps.record});
        }
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef && this.props.onRef(undefined);
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

    handleInputChange(event) {
        const object = utilsHelper.inputChange(event, this.state.record);
        this.setState({record: object});
    }

    onSubmit() {
        const {onSubmit, method, detailLink, beforeSubmit, afterSubmit} = this.props;

        if (onSubmit) {
            onSubmit(this.state.record);
        } else if (method) {
            let saveRecord;
            if (beforeSubmit) {
                saveRecord = beforeSubmit(this.state.record);
            } else {
                saveRecord = {...this.state.record};
            }

            Meteor.call(method, saveRecord, (error, recordId) => {
                utilsHelper.alertSystem(error);
                if (!error) {
                    if (afterSubmit) {
                        let record = {...saveRecord};
                        if (!record._id && typeof recordId === 'string') {
                            record._id = recordId;
                        } else {
                            record.extra = recordId;
                        }

                        afterSubmit(record);
                    } else {
                        this.props.history.push(vsprintf(detailLink, [recordId]));
                    }
                }
            });
        }
    }

    renderField(field) {
        if (field.display) {
            field = Object.assign({}, field, field.display);
        }

        if (field.alias) {
            field.name = field.alias;
        }

        const {helpers, component, record} = this.props;
        const value = this.getVal(field.name);
        const inputProps = field.inputProps || {};
        const childrenProps = field.props || {};
        let props = {
            type: field.type,
            name: field.name,
            required: field.required || false,
            placeholder: field.placeholder,
            value: value,
            onChange: this.handleInputChange,
            ...inputProps,
            ...childrenProps
        };

        if (field.fields) {
            props.fields = field.fields;
        }

        if (component) {
            return React.createElement(component, {...props, record: record || {}});
        } else if (field.renderField && helpers && helpers[field.renderField]) {
            return helpers[field.renderField](field, value, record, 'Input');
        } else {
            return <FieldInput {...props}/>
        }
    }

    renderFields(fields) {
        let columnsField = [];
        const columnClass = this.getColumnClassName(fields);
        for (let fieldName in fields) {
            let field = fields[fieldName];
            field.name = fieldName;

            const placeholder = field.placeholder || '';
            field.placeholder = placeholder;

            columnsField.push(
                <Col lg={columnClass} sm="12" key={field.name}>
                    <FormGroup>
                        <Label><T>{field.label}</T></Label>
                        {this.renderField(field)}
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

    renderFullForm(model, record) {
        const {title, slogan, detailLink, listLink, onlyForm} = this.props;
        const existingRecord = record && record._id;
        const recordFields = model.view.fields;

        if (onlyForm) {
            return this.renderFieldsRow(recordFields);
        }

        return (
            <Card>
                <CardHeader>
                    <i className={model.icon}/>
                    <strong>{title}</strong> {slogan || ''}
                </CardHeader>
                <CardBody>
                    {this.renderFieldsRow(recordFields)}
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.onSubmit}>
                        <i className="fa fa-dot-circle-o"/> <T>{existingRecord ? 'Update' : 'Create'}</T>
                    </Button>
                    <Button type="button" size="sm" color="danger">
                        {existingRecord
                            ?
                            <Link to={vsprintf(detailLink, [record._id])}>
                                <i className="fa fa-ban"/> <T>Cancel</T>
                            </Link>
                            :
                            <Link to={listLink}>
                                <i className="fa fa-ban"/> <T>Cancel</T>
                            </Link>
                        }
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    render() {
        const {model} = this.props;
        const record = this.props.record || {};

        if (!model) {
            return <Alert color="warning"><T>No Config</T></Alert>
        }

        return this.renderFullForm(model, record);
    }
}

export default withRouter(FormComponent);
