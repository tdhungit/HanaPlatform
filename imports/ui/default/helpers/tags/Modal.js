import React, {Component} from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button
} from 'reactstrap';

import {utilsHelper} from '../utils/utils';
import {T} from '/imports/common/Translation';

export class ShowModal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    toggle() {
        this.props.mdToggle && this.props.mdToggle();
    }

    onOk() {
        this.props.mdOk && this.props.mdOk();
    }

    onCancel() {
        if (this.props.mdCancel) {
            this.props.mdCancel()
        } else {
            this.toggle();
        }
    }

    render() {
        const {isOpen, mdIcon, mdTitle, mdComponent} = this.props;
        const props = utilsHelper.objectWithoutProperties(this.props, [
            'isOpen',
            'mdIcon',
            'mdTitle',
            'mdComponent',
            'mdToggle',
            'mdOk',
            'mdCancel'
        ]);

        const component = React.createElement(mdComponent, {...props});

        return (
            <Modal isOpen={isOpen}
                   toggle={this.toggle}
                   className="modal-lg">
                <ModalHeader toggle={this.toggle}>
                    <i className={mdIcon || 'fa fa-list'}/> {mdTitle}
                </ModalHeader>
                <ModalBody>
                    {component}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                            onClick={this.onOk}>
                        <T>Select</T>
                    </Button>{' '}
                    <Button color="secondary"
                            onClick={this.onCancel}>
                        <T>Cancel</T>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
