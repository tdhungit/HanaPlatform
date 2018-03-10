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

class DetailComponent extends Component {
    renderFields(model, record) {
        let fieldRender = [];
        for (let fieldName in model.view.fields) {
            let field = model.view.fields[fieldName];
            field.name = fieldName;
            fieldRender.push(
                <dl className="row" key={fieldName}>
                    <dt className="col-sm-3"><T>{field.label || fieldName}</T></dt>
                    <dd className="col-sm-9">
                        <FieldView record={record} field={field}/>
                    </dd>
                </dl>
            );
        }

        return fieldRender;
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

DetailComponent.propTypes = {
    title: PropTypes.string,
    model: PropTypes.object,
    record: PropTypes.object,
    editLink: PropTypes.string
};

export default withRouter(DetailComponent);
