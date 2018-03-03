import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import container from '/imports/common/Container';
import Loading from '../../components/Loading/Loading';
import {t, T, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';

class ViewModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model: {}
        }
    }

    componentWillMount() {
        if (this.props.model) {
            this.state.model = this.props.model;
        }
    }

    render() {
        return (
            <div className="models-ViewModel animated fadeIn">
                <PT title={this.state.model.collection}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-cogs"/>
                                <strong>{this.state.model.collection}</strong>
                                <div className="card-actions">
                                    <Link to={'/manager/models/' + this.state.model._id + '/edit'} title={t.__('Edit')}>
                                        <i className="fa fa-edit"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const modelId = props.match.params._id;
    const sub = Meteor.subscribe('models.detail', modelId);
    if (sub.ready()) {
        onData(null, {
            model: Models.findOne(modelId)
        });
    }
}, ViewModel, {loadingHandler: () => (<Loading/>)});
