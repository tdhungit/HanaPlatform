import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Input
} from 'reactstrap';
import {t} from '../../../../common/Translation';
import {Select2Helper} from './SelectHelper';

/**
 * address field view
 */
export class AddressView extends Component {
    static propTypes = {
        addressType: PropTypes.string,
        renderAddress: PropTypes.object
    };

    renderEUAddress() {
        const {value} = this.props;
        if (value) {
            return (
                <div className="AddressRow">
                    {value.street ? <span>{value.street}</span> : null}
                    {value.city ? <span> ,{value.city}</span> : null}
                    {value.state ? <span> ,{value.state}</span> : null}
                    {value.zipCode ? <span> ,{value.zipCode}</span> : null}
                    {value.country ? <span> ,{value.country}</span> : null}
                </div>
            );
        }
    }

    renderVNAddress() {
        const {value} = this.props;
        if (value) {
            return (
                <div className="AddressRow">
                    {value.street ? <span>{value.street}</span> : null}
                    {value.ward ? <span> ,{value.ward}</span> : null}
                    {value.district ? <span> ,{value.district}</span> : null}
                    {value.city ? <span> ,{value.city}</span> : null}
                    {value.country ? <span> ,{value.country}</span> : null}
                </div>
            );
        }
    }

    render() {
        const {className, addressType} = this.props;

        return (
            <div className={className || ''}>
                {addressType === 'EU' ? this.renderEUAddress() : this.renderVNAddress()}
            </div>
        );
    }
}

/**
 * address field input
 */
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
        this.defaultAddress();
    }

    defaultAddress() {
        const value = this.props.value || {};
        this.state.address = {
            street: value.street || '',
            ward: value.ward || '',
            district: value.district || '',
            city: value.city || '',
            state: value.state || '',
            zipCode: value.zipCode || '',
            country: value.country || ''
        };
    }

    inputChange(event) {
        const target = event.target;
        const addressField = target.name;
        const value = target.value;

        let address = this.state.address;
        address[addressField] = value;

        this.setState({address: address});

        const {type, name, onChange} = this.props;
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
                <Col md="6" className="addressRow">
                    <Input type="text" name="city" placeholder={t.__('City')} value={this.state.address.city}/>
                </Col>
                <Col md="6" className="addressRow">
                    <Input type="text" name="state" placeholder={t.__('State')} value={this.state.address.state}/>
                </Col>
                <Col md="6" className="addressRow">
                    <Input type="text" name="zipCode" placeholder={t.__('Zip Code')} value={this.state.address.zipCode}/>
                </Col>
                <Col md="6">
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
                <Col md="6" className="addressRow">
                    <Select2Helper name="city"
                                   value={this.state.address.city}
                                   placeholder={t.__('City')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
                <Col md="6" className="addressRow">
                    <Select2Helper name="district"
                                   value={this.state.address.district}
                                   placeholder={t.__('District')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
                <Col md="6" className="addressRow">
                    <Select2Helper name="ward"
                                   value={this.state.address.ward}
                                   placeholder={t.__('Ward')}
                                   options={["VietName", "HongKong"]}
                                   onChange={this.inputChange}/>
                </Col>
                <Col md="6">
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
        const {addressType, renderAddress} = this.props;
        if (renderAddress) {
            return renderAddress;
        }

        if (addressType === 'EU') {
            return this.renderEUAddress();
        }

        return this.renderVNAddress();
    }

    render() {
        this.defaultAddress();
        const {className} = this.props;

        return (
            <div className={className || ''}>
                {this.renderAddress()}
            </div>
        );
    }
}
