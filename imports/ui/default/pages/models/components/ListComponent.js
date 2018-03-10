import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {
    Table,
    Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';
import {vsprintf} from 'sprintf-js';
import BootstrapPaginator from 'react-bootstrap-pagination';

import {T} from '/imports/common/Translation';
import container from '/imports/common/Container';
import Loading from '../../../components/Loading/Loading';
import {FieldView} from '../../../components/Fields/Fields';

class ListComponent extends Component {
    renderHeader() {
        const model = this.props.model;

        let headers = [];
        for (let fieldName in model.list.fields) {
            let field = model.list.fields[fieldName];
            headers.push(<th key={fieldName}><T>{field.label || fieldName}</T></th>)
        }

        headers.push(<th key="actions"></th>);

        return headers;
    }

    renderCol(record) {
        const model = this.props.model;

        let cols = [];
        for (let fieldName in model.list.fields) {
            let field = model.list.fields[fieldName];
            field.name = fieldName;
            let col = (
                <td key={fieldName}>
                    <FieldView record={record} field={field}/>
                </td>
            );

            cols.push(col)
        }

        cols.push(
            <td key="actions">
                <a href="javascript:void(0)" className="btn btn-sm btn-link text-danger">
                    <i className="fa fa-trash"/>
                </a>
                <Link to={vsprintf(this.props.detailLink, [record._id])} className="btn btn-sm btn-link">
                    <i className="fa fa-eye"/>
                </Link>
                <Link to={vsprintf(this.props.editLink, [record._id])} className="btn btn-sm btn-link text-warning">
                    <i className="fa fa-edit"/>
                </Link>
            </td>
        );

        return cols;
    }

    renderRows() {
        return this.props.records.map((record) => {
            return (
                <tr key={record._id}>
                    {this.renderCol(record)}
                </tr>
            );
        });
    }

    render() {
        return this.props.records.length > 0 ? (
            <div>
                <Table responsive hover>
                    <thead>
                    <tr>{this.renderHeader()}</tr>
                    </thead>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </Table>
                <BootstrapPaginator pagination={this.props.pagination}
                                    limit={this.props.limit}
                                    containerClass="text-right"/>
            </div>
        ) : <Alert color="warning"><T>Empty Data.</T></Alert>
    }
}

ListComponent.propTypes = {
    model: PropTypes.object,
    pagination: PropTypes.object,
    limit: PropTypes.number,
    detailLink: PropTypes.string,
    editLink: PropTypes.string,
    records: PropTypes.array
};

export default withRouter(container((props, onData) => {
    if (props.pagination.ready()) {
        const records = props.pagination.getPage();
        const totalPages = props.pagination.totalPages();
        onData(null, {
            records,
            totalPages
        });
    }
}, ListComponent, {loadingHandler: () => <Loading/>}));
