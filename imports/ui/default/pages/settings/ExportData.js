import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row, Col,
    Card, CardHeader, CardBody, CardFooter,
    Button
} from 'reactstrap';
import {CSVLink} from 'react-csv';

import {PT, T, t} from '../../../../common/Translation';
import {Loading} from '../../components/Loading/Loading';
import {utilsHelper} from '../../helpers/utils/utils';

class ExportData extends Component {
    static viewInfo = {controller: 'Settings', action: 'Export'};

    constructor(props) {
        super(props);

        this.state = {
            method: '',
            loading: false,
            csvString: null
        };

        this.export = this.export.bind(this);
    }

    componentWillMount() {
        const collectionName = this.props.match.params._collection;
        this.state.method = collectionName.charAt(0).toLowerCase() + collectionName.slice(1) + '.export';
        this.state.loading = false;
    }

    export() {
        this.setState({loading: true});
        Meteor.call(this.state.method, (error, data) => {
            this.setState({loading: false});
            if (error) {
                utilsHelper.alertError(error);
            } else {
                const Papa = require("papaparse/papaparse.min");
                const csvString = Papa.unparse(data, {});
                this.setState({csvString: csvString});
            }
        });
    }

    render() {
        const collectionName = this.props.match.params._collection;

        return (
            <div className="ExportData animated fadeIn">
                <PT title={t.__('Export') + ' ' + collectionName}/>
                <Row>
                    <Col sm="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-expand"/>
                                <strong><T>Export Data</T></strong> {collectionName}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" lg="12">
                                        {this.state.loading ? <Loading/> : null}

                                        {this.state.csvString ?
                                            <CSVLink data={this.state.csvString}
                                                     filename={collectionName + '.csv'}>
                                                <T>Download</T>
                                            </CSVLink>
                                            : null}
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button type="button" color="primary" onClick={this.export}>
                                    <i className="fa fa-send"/> <T>Export</T>
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ExportData;