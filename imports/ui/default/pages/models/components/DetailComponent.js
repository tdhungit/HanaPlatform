import React, {Component} from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {
    Card,
    CardHeader,
    CardBody,
    Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {vsprintf} from 'sprintf-js';

import {t, T} from '/imports/common/Translation';
import {FieldView} from '../../../components/Fields/Fields';

/**
 * detail a field
 */
export class FieldDetail extends Component {
    static propTypes = {
        fields: PropTypes.object.isRequired,
        record: PropTypes.object.isRequired,
        component: PropTypes.func,
        helpers: PropTypes.object
    };

    getColumnClassName(fields) {
        let columns = _.size(fields);
        let labelClass = 'col-sm-3';
        let valueClass = 'col-sm-9';
        if (columns == 2) {
            labelClass = 'col-sm-3';
            valueClass = 'col-sm-3';
        }

        return {
            labelClass: labelClass,
            valueClass: valueClass
        }
    }

    renderFieldView(field) {
        const {record, component, helpers} = this.props;

        if (component) {
            return React.createElement(component, {field, record: record || {}});
        } else if (field.renderField && helpers && helpers[field.renderField]) {
            return helpers[field.renderField](field, value, record, 'View');
        } else {
            return <FieldView record={record} field={field}/>;
        }
    }

    render() {
        const {fields} = this.props;
        const className = this.getColumnClassName(fields);

        let renderFields = [];
        for (let fieldName in fields) {
            let field = fields[fieldName];
            field.name = fieldName;

            renderFields.push(
                <dt key={'label' + fieldName} className={className.labelClass}>
                    <T>{field.label || field.name}</T>
                </dt>
            );

            renderFields.push(
                <dd key={'value' + fieldName} className={className.valueClass}>
                    {this.renderFieldView(field)}
                </dd>
            );
        }

        return (
            <dl className="row">
                {renderFields}
            </dl>
        );
    }
}

/**
 * tag for view detail a record
 */
class DetailComponent extends Component {
    static propTypes = {
        title: PropTypes.string,
        model: PropTypes.object,
        record: PropTypes.object,
        editLink: PropTypes.string,
        headerLinks: PropTypes.array,
        component: PropTypes.func,
        helpers: PropTypes.object
    };

    renderFields(model, record) {
        const {component, helpers} = this.props;

        let fieldRender = [];
        for (let idx in model.view.fields) {
            let fields = model.view.fields[idx];
            fieldRender.push(
                <FieldDetail key={idx} fields={fields} record={record} component={component} helpers={helpers}/>
            );
        }

        return fieldRender;
    }

    renderHeaderLinks() {
        const {record} = this.props;

        if (!this.props.headerLinks) {
            return null;
        }

        let headerLinks = [];
        for (let idx in this.props.headerLinks) {
            let link = this.props.headerLinks[idx];
            headerLinks.push(
                <Link key={link} to={vsprintf(link.url, [record._id])} title={link.title}>
                    <i className={link.icon}/>
                </Link>
            );
        }

        return headerLinks;
    }

    render() {
        const {model, record, editLink, title} = this.props;

        if (!model || !record || !record._id) {
            return <Alert color="danger"><T>No Data</T></Alert>;
        }

        const titleRecord = record[model.view.title];
        return (
            <Card>
                {title ?
                <CardHeader>
                    <i className={model.icon}/>
                    <strong>{title}</strong> {titleRecord}
                    <div className="card-actions">
                        {this.renderHeaderLinks()}
                        {editLink ?
                        <Link to={vsprintf(editLink, [record._id])} title={t.__('Edit')}>
                            <i className="fa fa-edit"/>
                        </Link> : null}
                    </div>
                </CardHeader> : null}
                <CardBody className="title">
                    {this.renderFields(model, record)}
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(DetailComponent);
