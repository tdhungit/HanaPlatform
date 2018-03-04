import React, {Component} from 'react';
import {
    Table,
    Alert
} from 'reactstrap';
import BootstrapPaginator from 'react-bootstrap-pagination';

import {T} from '/imports/common/Translation';
import container from '/imports/common/Container';
import Loading from '../../../components/Loading/Loading';
import {FieldDetailView} from '../../../components/Fields/FieldView';

class ListViewTable extends Component {
    renderHeader() {
        let headers = [];
        for (let fieldName in this.props.model.list) {
            let field = this.props.model.list[fieldName];
            headers.push(<th><T>{field.label || fieldName}</T></th>)
        }

        return headers;
    }

    renderCol(record) {
        let cols = [];
        for (let fieldName in this.props.model.list) {
            let field = this.props.model.list[fieldName];
            field.name = fieldName;
            let col = (
                <th>
                    <FieldDetailView record={record} field={field}/>
                </th>
            );

            cols.push(col)
        }

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
    console.log(props.pagination.ready());
    if (props.pagination.ready()) {
        const records = props.pagination.getPage();
        const totalPages = props.pagination.totalPages();
        onData(null, {records, totalPages});
    }
}, ListViewTable, {loadingHandler: () => <Loading/>});
