import React, {Component} from 'react';
import {_} from 'meteor/underscore';
import PropTypes from 'prop-types';
import {
    Button, Input,
    InputGroup, InputGroupAddon,
    Modal, ModalBody, ModalHeader, ModalFooter
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {sprintf} from 'sprintf-js';

import {utilsHelper} from '../utils/utils';
import {myModel} from '../../../../common/Model';
import {T} from '../../../../common/Translation';

/**
 * view value for relate field type
 * props: modelName, moduleName, value, titleField: array field name, link {%(path)s: modelName, %(_id)s: value}
 */
export class RelateView extends Component {
    static propTypes = {
        modelName: PropTypes.string,
        titleField: PropTypes.array,
        link: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            relate: {
                _id: '',
                name: ''
            }
        };
    }

    componentDidMount() {
       this.getRelate();
    }

    getRelate() {
        const {modelName, moduleName, titleField, value} = this.props;

        if (modelName && value) {
            myModel.getCollectionClass(modelName, moduleName, (model) => {
                const record = model.findOne(value);
                const relate = {
                    _id: record._id,
                    name: utilsHelper.getRecordTitle(record, titleField)
                };

                this.setState({relate});
            });
        }
    }

    render() {
        const {modelName, link, value} = this.props;
        const stringLink = link || '/manager/%(path)s/%(_id)s/detail';
        const routerLink = sprintf(stringLink, {
            path: modelName.toLowerCase(),
            _id: value
        });

        return (
            <Link to={routerLink}>
                {this.state.relate.name}
            </Link>
        );
    }
}

/**
 * input for relate field type
 */
export class RelateInput extends Component {
    static propTypes = {
        modelName: PropTypes.string,
        titleField: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            relate: {
                _id: '',
                name: ''
            },
            isModal: false
        };
    }

    componentDidMount() {
        this.getRelate();
    }

    getRelate() {
        const {modelName, moduleName, titleField, value} = this.props;

        if (modelName && value) {
            myModel.getCollectionClass(modelName, moduleName, (model) => {
                const record = model.findOne(value);
                const relate = {
                    _id: record._id,
                    name: utilsHelper.getRecordTitle(record, titleField)
                };

                this.setState({relate});
            });
        }
    }

    renderModal() {
        const {modelName} = this.props;

        return (
            <Modal isOpen={this.state.isModal}
                   toggle={() => {}} className="modal-lg">
                <ModalHeader toggle={() => this.setState({isModal: !this.state.isModal})}>
                    <i className="fa fa-list-ul"/> <T>Choose</T> <T>{modelName}</T>
                </ModalHeader>
                <ModalBody>

                </ModalBody>
            </Modal>
        );
    }

    render() {
        return (
            <div className="controls">
                <InputGroup>
                    <Input type="text" name="name"/>
                    <Input type="hidden" name="id"/>
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={() => this.setState({isModal: true})}>
                            <i className="fa fa-mouse-pointer"/>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                {this.renderModal()}
            </div>
        );
    }
}