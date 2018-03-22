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
import {FieldDetail} from '../../../components/Fields/Fields';

/**
 * tag for view detail a record
 */
class DetailComponent extends Component {
    static propTypes = {
        title: PropTypes.string,
        model: PropTypes.object,
        record: PropTypes.object,
        editLink: PropTypes.string
    };

    renderFields(model, record) {
        let fieldRender = [];
        for (let idx in model.view.fields) {
            let fieldsRow = model.view.fields[idx];
            fieldRender.push(
                <FieldDetail key={idx} fieldsRow={fieldsRow} record={record}/>
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

export default withRouter(DetailComponent);
