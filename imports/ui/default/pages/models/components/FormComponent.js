import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
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
import {Bert} from 'meteor/themeteorchef:bert';
import {vsprintf} from 'sprintf-js';

import {t, T} from '/imports/common/Translation';
import {utilsHelper} from '../../../helpers/utils/utils';
import {FieldInput} from '../../../components/Fields/Fields';

class FormComponent extends Component {
    static propTypes = {
        model: PropTypes.object,
        record: PropTypes.object,
        title: PropTypes.string,
        slogan: PropTypes.string,
        detailLink: PropTypes.string,
        listLink: PropTypes.string,
        onSubmit: PropTypes.func,
        method: PropTypes.string
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

    getVal(field) {
        return utilsHelper.getField(this.state.record, field, '');
    }

    handleInputChange(event) {
        const object = utilsHelper.inputChange(event, this.state.record);
        this.setState({record: object});
    }

    onSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.record);
        } else if (this.props.method) {
            Meteor.call(this.props.method, this.state.record, (error, recordId) => {
                if (error) {
                    Bert.alert(error.reason, 'danger');
                } else {
                    Bert.alert(t.__('Successful'), 'success');
                    this.props.history.push(vsprintf(this.props.detailLink, [recordId]));
                }
            });
        }
    }

    renderFields(fields) {
        let fieldsRender = [];
        for (let fieldName in fields) {
            let field = fields[fieldName];
            let placeholder = '';
            if (field.placeholder) {
                placeholder = field.placeholder;
            }

            let row = (
                <Row key={fieldName}>
                    <Col>
                        <FormGroup>
                            <Label><T>{field.label}</T></Label>
                            <FieldInput type={field.type} name={fieldName} required={field.required || false}
                                           placeholder={placeholder}
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

    render() {
        const {
            model,
            record
        } = this.props;

        if (!model) {
            return <Alert color="warning"><T>No Config</T></Alert>
        }

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
                    <Button type="button" size="sm" color="primary" onClick={this.onSubmit}>
                        <i className="fa fa-dot-circle-o"></i> <T>{existingRecord ? 'Update' : 'Create'}</T>
                    </Button>
                    <Button type="button" size="sm" color="danger">
                        {existingRecord
                            ?
                            <Link to={vsprintf(this.props.detailLink, [record._id])}>
                                <i className="fa fa-ban"></i> <T>Cancel</T>
                            </Link>
                            :
                            <Link to={this.props.listLink}>
                                <i className="fa fa-ban"></i> <T>Cancel</T>
                            </Link>
                        }
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(FormComponent);
