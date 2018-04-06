import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Input
} from 'reactstrap';
import {t} from '../../../../common/Translation';
import {Select2Helper} from './SelectHelper';

export class AddressInput extends Component {
    static propTypes = {
        addressType: PropTypes.string,
        renderAddress: PropTypes.object,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            address: {
                street: '',
                ward: '',
                district: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            }
        };

        this.inputChange = this.inputChange.bind(this);
    }

    componentWillMount() {

    }

    inputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        let address = this.state.address;
        address[name] = value;

        this.setState({address: address});

        const {type, onChange} = this.props;
        const eventOut = {
            target: {
                name: name,
                type: type || 'address',
                value: this.state.address
            }
        };

        onChange && onChange(eventOut);
    }

    renderEUAddress() {
        return (
            <Row>
                <Col md="12" className="addressRow">
                    <Input type="text" name="street" placeholder={t.__('Street')} value={this.state.address.street}/>
                </Col>
                <Col md="12" className="addressRow">
                    <Input type="text" name="city" placeholder={t.__('City')} value={this.state.address.city}/>
                </Col>
                <Col md="4" className="addressRow">
                    <Input type="text" name="state" placeholder={t.__('State')} value={this.state.address.state}/>
                </Col>
                <Col md="8" className="addressRow">
                    <Input type="text" name="zipCode" placeholder={t.__('Zip Code')} value={this.state.address.zipCode}/>
                </Col>
                <Col md="12">
                    <Input type="text" name="country" placeholder={t.__('Country')} value={this.state.address.country}/>
                </Col>
            </Row>
        );
    }

    renderVNAddress() {
        return (
            <Row>
                <Col md="12" className="addressRow">
                    <Input type="text"
                           name="street"
                           value={this.state.address.street}
                           placeholder={t.__('Street')}
                           onChange={this.inputChange}/>
                </Col>
                <Col md="12" className="addressRow">
                    <Select2Helper name="city"
                                   value={this.state.address.city}
                                   placeholder={t.__('City')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
                <Col md="12" className="addressRow">
                    <Select2Helper name="district"
                                   value={this.state.address.district}
                                   placeholder={t.__('District')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
                <Col md="12" className="addressRow">
                    <Select2Helper name="ward"
                                   value={this.state.address.ward}
                                   placeholder={t.__('Ward')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
                <Col md="12">
                    <Select2Helper name="country"
                                   value={this.state.address.country}
                                   placeholder={t.__('Country')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
            </Row>
        );
    }

    renderAddress() {
        const {addressType,renderAddress} = this.props;
        if (renderAddress) {
            return renderAddress;
        }

        if (addressType === 'EU') {
            return this.renderEUAddress();
        }

        return this.renderVNAddress();
    }

    render() {
        const {className} = this.props;

        return (
            <div className={className || ''}>
                {this.renderAddress()}
            </div>
        );
    }
}
