import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

class FormView extends Component {
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
