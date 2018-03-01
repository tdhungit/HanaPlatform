import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {
    Card,
    CardHeader,
    CardBody,
    Table
} from 'reactstrap';
import {Link} from 'react-router-dom';

import Models from '/imports/collections/Models/Models';
import {t, T, PT} from '/imports/common/Translation';

class FormModel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-cogs"/>
                    <strong>{this.props.title}</strong> {this.props.slogan}
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>
        );
    }
}

export default withRouter(FormModel);
