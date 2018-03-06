import React, {Component} from 'react';
import {
    Table,
    Alert
} from 'reactstrap';
import {Link} from 'react-router-dom';
import BootstrapPaginator from 'react-bootstrap-pagination';

import {T} from '/imports/common/Translation';
import container from '/imports/common/Container';
import Loading from '../../../components/Loading/Loading';
import {FieldDetailView} from '../../../components/Fields/FieldView';

class ListViewTable extends Component {
    renderHeader() {
        let headers = [];
        for (let fieldName in this.props.model.list.fields) {
            let field = this.props.model.list.fields[fieldName];
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
                    <FieldDetailView record={record} field={field}/>
                </td>
            );

            cols.push(col)
        }

        cols.push(
            <td key="actions">
                <a href="javascript:void(0)" className="btn btn-sm btn-link text-danger">
                    <i className="fa fa-trash"/>
                </a>
                <Link to={'/manager/model/' + model.model + '/' + record._id + '/detail'} className="btn btn-sm btn-link">
                    <i className="fa fa-eye"/>
                </Link>
                <Link to={'/manager/model/' + model.model + '/' + record._id + '/edit'} className="btn btn-sm btn-link text-warning">
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

export default container((props, onData) => {
    if (props.pagination.ready()) {
        const records = props.pagination.getPage();
        const totalPages = props.pagination.totalPages();
        onData(null, {
            records,
            totalPages
        });
    }
}, ListViewTable, {loadingHandler: () => <Loading/>});
