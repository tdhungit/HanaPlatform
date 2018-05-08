import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Button,
    Label,
    FormGroup
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, T, PT} from '/imports/common/Translation';
import Companies from '/imports/collections/Companies/Companies';
import {Loading} from '../../components/Loading/Loading';
import {utilsHelper} from '../../helpers/utils/utils';

class Install extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyName: '',
            companyDomain: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };

        this.inputChange = this.inputChange.bind(this);
    }

    componentWillMount() {
        const {installed} = this.props;

        if (installed) {
            this.props.history.push('/');
        }
    }

    inputChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value});
    }

    handleInstall() {
        if (this.state.companyName && this.state.companyDomain
            && this.state.username && this.state.password && this.state.passwordConfirm
            && this.state.password === this.state.passwordConfirm) {
            const company = {
                name: this.state.companyName,
                domain: this.state.companyDomain
            };

            const user = {
                username: this.state.username.trim() + '.' + this.state.companyDomain,
                email: this.state.email,
                password: this.state.password
            };

            Meteor.call('companies.register', company, user, (error, companyId) => {
                if (error) {
                    utilsHelper.alertError(error);
                } else {
                    utilsHelper.successMessage(t.__('Installation successful'));
                    this.props.history.push('/');
                }
            });
        } else {
            utilsHelper.errorMessage(t.__('Input data error'));
        }
    }

    render() {
        return (
            <Container>
                <PT title={t.__('Install Hana Platform')}/>
                <div className="Install animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-code"/>
                                    <strong>Install Hana Platform</strong>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label><T>Company Name</T></Label>
                                                <Input type="text" name="companyName"
                                                       value={this.state.companyName} onChange={this.inputChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label><T>Company Domain</T></Label>
                                                <Input type="text" name="companyDomain"
                                                       value={this.state.companyDomain} onChange={this.inputChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label><T>Admin Username</T></Label>
                                                <Input type="text" name="username"
                                                       value={this.state.username} onChange={this.inputChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label><T>Admin Email</T></Label>
                                                <Input type="text" name="email"
                                                       value={this.state.email} onChange={this.inputChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label><T>Admin Password</T></Label>
                                                <Input type="text" name="password"
                                                       value={this.state.password} onChange={this.inputChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <Label><T>Admin Password Confirm</T></Label>
                                                <Input type="text" name="passwordConfirm"
                                                       value={this.state.passwordConfirm} onChange={this.inputChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button type="button" size="sm" color="primary"
                                            onClick={() => this.handleInstall()}>
                                        <i className="fa fa-dot-circle-o"></i> <T>Install</T>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default container((props, onData) => {
    const sub = Meteor.subscribe('companies.list');
    if (sub.ready()) {
        let installed = false;
        const firstCompany = Companies.findOne({});
        if (firstCompany && firstCompany._id) {
            installed = true;
        }
        onData(null, {
            installed: installed
        });
    }
}, Install, {loadingHandler: () => (<Loading/>)});
