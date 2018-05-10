import React, {Component} from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {
    Button,
    Row,
    Col,
    ListGroup, ListGroupItem,
    Collapse,
    Badge
} from 'reactstrap';
import {FieldInput, FieldView} from '../../components/Fields/Fields';
import {utilsHelper} from '../utils/utils';

/**
 * render array field
 */
export class ArrayFieldView extends Component {
    static propTypes = {
        renderRow: PropTypes.func,
        itemType: PropTypes.string
    };

    renderRow(record) {
        const {fields, renderRow, itemType} = this.props;

        if (renderRow) {
            return renderRow(record);
        }

        if (!fields) {
            return <FieldView field={{type: itemType}} value={record}/>;
        }

        let fieldsRender = [];
        _.each(fields, (field, i) => {
            fieldsRender.push(
                <FieldView key={i} field={{type: 'text'}} value={record && record[field] || ''}/>
            );
        });

        return fieldsRender;
    }

    render() {
        const {className} = this.props;
        const value = this.props.value || [];

        return (
            <div className={className || ''}>
                <ul className="ArrayViewUl">
                    {value.map((record, i) => {
                        return (
                            <li key={i}>
                                {this.renderRow(record)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

/**
 * render and handle array input field
 */
export class ArrayFieldInput extends Component {
    static propTypes = {
        renderInput: PropTypes.object,
        renderViewRow: PropTypes.object,
        itemType: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            array: [],
            rowValue: {},
            displayInput: false
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.defaultValue();
    }

    defaultValue() {
        this.state.array = this.props.value || [];
    }

    newRow() {
        let array = this.state.array;
        const rowValue = this.state.rowValue;
        array.push(rowValue);
        this.setState({
            array: array,
            rowValue: {},
            displayInput: false
        });

        console.log(this.state.array);

        // callback
        const eventOut = {
            target: {
                name: this.props.name,
                type: this.props.type || 'array',
                value: this.state.array
            }
        };

        const {onChange} = this.props;
        onChange && onChange(eventOut);
    }

    removeRow(idx) {
        let array = this.state.array;
        array.splice(idx, 1);
        this.setState({array: array});
    }

    onChange(event) {
        const type = event.target.type;
        const name = event.target.name;
        const value = event.target.value;

        let rowValue = this.state.rowValue;
        if (type === 'text') {
            rowValue[name] = value;
        } else {
            rowValue = value;
        }

        this.setState({rowValue: rowValue});
    }

    renderFieldsRow(item) {
        const {itemType, fields} = this.props;

        if (!fields) {
            return <FieldView field={{type: itemType}} value={item}/>;
        }

        let fieldsView = [];
        _.each(fields, (field, i) => {
            fieldsView.push(
                <FieldView key={i} field={{type: 'text'}} value={item[field] || ''}/>
            );
        });

        return fieldsView;
    }

    renderViewRow() {
        const {renderViewRow} = this.props;
        if (renderViewRow) {
            return renderViewRow;
        }

        return (
            <div className="ArrayViewRow">
                <ListGroup>
                    {this.state.array.map((item, i) => {
                        return (
                            <ListGroupItem  key={i}>
                                {this.renderFieldsRow(item)}
                                <Badge pill color="danger" onClick={() => this.removeRow(i)}
                                       style={{position: 'absolute', right: 10, top: 15}}><i className="fa fa-remove"/></Badge>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }

    renderFieldInput() {
        const {itemType, fields} = this.props;
        const type = itemType || 'text';
        const attributes = utilsHelper.objectWithoutProperties(this.props, [
            'type',
            'value',
            'onChange'
        ]);

        if (!fields) {
            return <FieldInput type={type} value={this.state.rowValue} onChange={this.onChange} {...attributes}/>;
        }

        let inputFields = [];
        _.each(fields, (field, i) => {
            inputFields.push(
                <FieldInput key={i} type="text" name={field} value={this.state.rowValue[field] || ''} onChange={this.onChange}/>
            )
        });

        return inputFields;
    }

    renderInput() {
        const {renderInput} = this.props;
        if (renderInput) {
            return renderInput;
        }

        return (
            <div className="animated fadeIn ArrayInput">
                {!this.state.displayInput ?
                    <Button type="button" outline color="info"
                            onClick={() => this.setState({displayInput: true})}>
                        <i className="fa fa-plus-square"/>
                    </Button> : null}
                <Collapse isOpen={this.state.displayInput}>
                    <Row>
                        <Col md="10">
                            {this.renderFieldInput()}
                        </Col>
                        <Col md="2">
                            <Button type="button" color="warning" className="pull-right"
                                    style={{marginBottom: 5}}
                                    onClick={() => this.setState({displayInput: false})}>
                                <i className="fa fa-ban"/>
                            </Button>
                            <Button type="button" color="info" className="pull-right"
                                    style={{marginBottom: 5}}
                                    onClick={() => this.newRow()}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </Col>
                    </Row>
                </Collapse>
            </div>
        );
    }

    render() {
        this.defaultValue();
        const {className} = this.props;

        return (
            <div className={className}>
                {this.props.value ? this.renderViewRow() : null}
                {this.renderInput()}
            </div>
        );
    }
}