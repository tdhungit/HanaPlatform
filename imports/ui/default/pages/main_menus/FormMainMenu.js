import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import {T, t} from '/imports/common/Translation';
import {SelectHelper} from '../../helpers/inputs/SelectHelper';
import {SelectSimpleLineIcon} from '../../helpers/inputs/SelectSimpleLineIcon';
import {utilsHelper} from '../../helpers/utils/utils';

class FormMainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: {
                name: '',
                url: '',
                icon: '',
                weight: 0,
                parent: '',
                title: false,
                divider: false,
                badge_variant: '',
                badge_text: ''
            },
            root_menus: [],
            modalIcon: false
        };

        this.toggleModalIcon = this.toggleModalIcon.bind(this);
        this.getIcon = this.getIcon.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        const {
            menu
        } = this.props;

        Meteor.call('mainMenus.ROOT', (error, response) => {
            if (!error) {
                let root_menus = [];
                for (let idx in response) {
                    let menu = response[idx];
                    root_menus.push({
                        name: menu.name,
                        value: menu._id
                    });
                }

                this.setState({root_menus: root_menus});
            }
        });

        if (typeof menu != 'undefined' && menu._id) {
            let menuClean = menu;
            menuClean.badge_variant = menu.badge && menu.badge.variant;
            menuClean.badge_text = menu.badge && menu.badge.text;
            this.setState({menu: menuClean});
        }
    }

    toggleModalIcon() {
        this.setState({
            modalIcon: !this.state.modalIcon
        });
    }

    getIcon(event) {
        const target = event.target;
        const all_class = target.className;
        const icon_name = all_class.replace(' icons font-2xl d-block mt-4', '');
        let menu = this.state.menu;
        menu.icon = icon_name;
        this.setState({
            menu: menu,
            modalIcon: !this.state.modalIcon
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let menu = this.state.menu;
        menu[name] = value;

        this.setState({menu: menu});
    }

    handleSubmit() {
        const existing = this.props.menu && this.props.menu._id;
        const method = existing ? 'mainMenus.update' : 'mainMenus.insert';

        if (this.state.menu.name && this.state.menu.icon) {
            if (this.state.menu.badge_variant && this.state.menu.badge_text) {
                this.state.menu.badge = {
                    variant: this.state.menu.badge_variant,
                    text: this.state.menu.badge_text
                };
            }

            Meteor.call(method, this.state.menu, (error, menuId) => {
                utilsHelper.alertSystem(error);
                if (!error) {
                    this.props.history.push('/manager/main-menus/' + menuId + '/edit');
                }
            });
        }
    }

    render() {
        const {
            title,
            slogan
        } = this.props;

        const existing = this.props.menu && this.props.menu._id;

        return (
            <Card>
                <CardHeader>
                    <strong>{title}</strong> {slogan}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12" lg="6">
                            <FormGroup>
                                <Label><T>Menu name</T></Label>
                                <Input type="text" name="name" value={this.state.menu.name}
                                       placeholder={t.__("Enter here")} onChange={this.handleInputChange} required/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" lg="6">
                            <FormGroup>
                                <Label><T>Weight</T></Label>
                                <Input type="text" name="weight" value={this.state.menu.weight}
                                       placeholder={t.__("Enter here")} onChange={this.handleInputChange} required/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="6">
                            <FormGroup>
                                <Label><T>Url</T></Label>
                                <Input type="text" name="url" placeholder={t.__('Enter here')}
                                       onChange={this.handleInputChange} value={this.state.menu.url} required/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" lg="6">
                            <FormGroup>
                                <Label><T>Icon</T></Label>
                                <InputGroup>
                                    <Input type="text" name="icon" placeholder={t.__("Enter here")}
                                           onChange={this.handleInputChange} value={this.state.menu.icon} required/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" onClick={this.toggleModalIcon}><i
                                            className="fa fa-search"></i> <T>Search</T></Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Modal isOpen={this.state.modalIcon} toggle={this.toggleModalIcon} className="modal-lg">
                            <ModalHeader toggle={this.toggleModalIcon}><T>Choose Icon</T></ModalHeader>
                            <ModalBody>
                                <SelectSimpleLineIcon onClick={this.getIcon}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggleModalIcon}><T>Cancel</T></Button>
                            </ModalFooter>
                        </Modal>
                    </Row>
                    <Row>
                        <Col xs="12" lg="6">
                            <FormGroup check>
                                <div className="checkbox">
                                    <Label>
                                        <Input type="checkbox" name="title" value={this.state.menu.title}
                                               onChange={this.handleInputChange}/>
                                        <T>Title</T>
                                    </Label>
                                </div>
                            </FormGroup>
                        </Col>
                        <Col xs="12" lg="6">
                            <FormGroup check>
                                <div className="checkbox">
                                    <Label>
                                        <Input type="checkbox" name="divider" value={this.state.menu.divider}
                                               onChange={this.handleInputChange}/>
                                        <T>Divider</T>
                                    </Label>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="6">
                            <FormGroup>
                                <Label><T>Badge Variant</T></Label>
                                <Input type="select" name="badge_variant" value={this.state.menu.badge_variant}
                                       onChange={this.handleInputChange}>
                                    <option value=""></option>
                                    <option value="info">Info</option>
                                    <option value="warning">Warning</option>
                                    <option value="danger">Danger</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="12" lg="6">
                            <FormGroup>
                                <Label><T>Badge Text</T></Label>
                                <Input type="text" name="badge_text" value={this.state.menu.badge_text}
                                       placeholder={t.__("Enter here")} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="12">
                            <FormGroup>
                                <Label><T>Parent</T></Label>
                                <SelectHelper name="parent" options={this.state.root_menus}
                                              onChange={this.handleInputChange} value={this.state.menu.parent}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i>&nbsp;
                        {existing ? <T>Update</T> : <T>Create</T>}
                    </Button>
                    <Button type="reset" size="sm" color="danger"
                            onClick={() => this.props.history.push('/manager/main-menus')}>
                        <i className="fa fa-ban"></i> <T>Cancel</T>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

FormMainMenu.defaultProps = {
    title: null,
    slogan: null,
    menu: {}
};

FormMainMenu.propTypes = {
    title: PropTypes.string,
    slogan: PropTypes.string,
    menu: PropTypes.object
};

export default withRouter(FormMainMenu);
