import React, {Component} from 'react';
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
        record: PropTypes.object.isRequired
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

    render() {
        const {fields, record} = this.props;
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
                    <FieldView record={record} field={field}/>
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
        headerLinks: PropTypes.array
    };

    renderFields(model, record) {
        let fieldRender = [];
        for (let idx in model.view.fields) {
            let fields = model.view.fields[idx];
            fieldRender.push(
                <FieldDetail key={idx} fields={fields} record={record}/>
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
        const {
            model,
            record
        } = this.props;

        if (!model || !record) {
            return <Alert color="danger"><T>No Data</T></Alert>;
        }

        const title = record[model.view.title];
        return (
            <Card>
                <CardHeader>
                    <i className={model.icon}/>
                    <strong>{this.props.title}</strong> {title}
                    <div className="card-actions">
                        {this.renderHeaderLinks()}
                        <Link to={vsprintf(this.props.editLink, [record._id])} title={t.__('Edit')}>
                            <i className="fa fa-edit"/>
                        </Link>
                    </div>
                </CardHeader>
                <CardBody className="title">
                    {this.renderFields(model, record)}
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(DetailComponent);
