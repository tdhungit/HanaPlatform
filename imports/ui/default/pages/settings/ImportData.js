import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row, Col,
    Card, CardHeader, CardBody, CardFooter,
    FormGroup, Label,
    Input, Button,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';
import ReactJson from 'react-json-view';

import {PT, T, t} from '../../../../common/Translation';
import {utilsHelper} from '../../helpers/utils/utils';

class ImportData extends Component {
    static viewInfo = {controller: 'Settings', action: 'Import'};

    constructor(props) {
        super(props);

        this.state = {
            csv: null,
            data: null,
            method: '',
            importStatus: null
        };

        this.onImport = this.onImport.bind(this);
        this.onAddCSV = this.onAddCSV.bind(this);
        this.updateData = this.updateData.bind(this);
        this.import = this.import.bind(this);
    }

    componentWillMount() {
        const collectionName = this.props.match.params._collection;
        this.state.method = collectionName.charAt(0).toLowerCase() + collectionName.slice(1) + '.import';
    }

    onAddCSV(event) {
        const file = event.target.files && event.target.files[0] || false;
        if (file) {
            this.setState({
                csv: file,
                data: null
            });
        }
    }

    onImport() {
        if (this.state.csv) {
            const Papa = require("papaparse/papaparse.min");
            Papa.parse(this.state.csv, {
                header: true,
                download: true,
                skipEmptyLines: true,
                complete: this.updateData
            });
        }
    }

    updateData(result) {
        const data = result.data || [];
        let dataImport = [];
        _.each(data, (record) => {
            let recordImport = {};
            for (let name in record) {
                let value = record[name];
                if (name.indexOf('.') < 0) {
                    recordImport[name] = value;
                } else {
                    let nameArray = name.split('.');
                    nameArray.push(value);
                    utilsHelper.createRecursiveObject(value, nameArray, recordImport);
                }
            }

            dataImport.push(recordImport);
        });

        this.setState({data: dataImport});
    }

    import() {
        Meteor.call(this.state.method, this.state.data, (error, data) => {
            utilsHelper.alertSystem(error);
            if (!error) {
                this.setState({
                    csv: null,
                    data: null,
                    importStatus: data
                });
            }
        });
    }

    renderImportStatus() {
        if (!this.state.importStatus) {
            return null;
        }

        const successes = (
            <ListGroup>
                {this.state.importStatus.successes.map((successData, i) => {
                    return (
                        <ListGroupItem key={i} color="success">
                            <ListGroupItemHeading><T>Successful!</T>: {successData._id}</ListGroupItemHeading>
                            <ListGroupItemText>{JSON.stringify(successData.record)}</ListGroupItemText>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );

        const errors = (
            <ListGroup>
                {this.state.importStatus.errors.map((errorData, i) => {
                    let errorMessage = errorData.error.sanitizedError && errorData.error.sanitizedError.reason || t.__('System Error!');
                    return (
                        <ListGroupItem key={i} color="danger">
                            <ListGroupItemHeading>{errorMessage}</ListGroupItemHeading>
                            <ListGroupItemText>{JSON.stringify(errorData.record)}</ListGroupItemText>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        );

        return (
            <Row>
                <Col sm="12" lg="12">
                    {successes}
                    {errors}
                </Col>
            </Row>
        );
    }

    render() {
        const collectionName = this.props.match.params._collection;
        const title = t.__('Import Data') + ' ' + collectionName;

        return (
            <div className="ImportData animated fadeIn">
                <PT title={title}/>
                <Row>
                    <Col sm="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-code"/>
                                <strong>{title}</strong>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm="12" lg="12">
                                        <FormGroup>
                                            <Label><T>Import CSV</T></Label>
                                            <Input type="file" onChange={this.onAddCSV}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {this.state.data ?
                                    <Row>
                                        <Col sm="12" lg="12">
                                            <ReactJson src={this.state.data}/>
                                        </Col>
                                    </Row> : null}
                                {this.renderImportStatus()}
                            </CardBody>
                            <CardFooter>
                                {this.state.data ?
                                    <Button type="button" color="danger" onClick={this.import}>
                                        <i className="fa fa-send"/> <T>Import</T>
                                    </Button> :
                                    <Button type="button" color="primary" onClick={this.onImport}>
                                        <i className="fa fa-dot-circle-o"/> <T>Upload</T>
                                    </Button>}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ImportData;