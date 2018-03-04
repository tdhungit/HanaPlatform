import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

import {utilsHelper} from '../../../helpers/utils/utils';

class FormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            record: {}
        }
    }

    componentWillMount() {
        if (this.props.record) {
            this.state.record = this.props.record;
        }
    }

    getVal(field) {
        return utilsHelper.getField(this.state.record, field, '');
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-list"/>
                    <strong>{this.props.title}</strong> {this.props.slogan}
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>
        );
    }
}

export default withRouter(FormView);
