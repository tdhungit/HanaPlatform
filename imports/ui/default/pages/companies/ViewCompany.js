import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col
} from 'reactstrap';

import container from '/imports/common/Container';
import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import Companies from '/imports/collections/Companies/Companies';
import DetailComponent from '../models/components/DetailComponent';

class ViewCompany extends Component {
    static viewInfo = {controller: 'Companies', action: 'View'};

    render() {
        const {company} = this.props;

        const model = Models.getModel('Companies') || Companies.getLayouts();

        return (
            <div className="ViewCompany animated fadeIn">
                <PT title={t.__('View Company') + ': ' + company.name}/>
                <Row>
                    <Col xs="12" lg="12">
                        <DetailComponent
                            title={t.__('View Company')}
                            model={model}
                            record={company}
                            editLink="/manager/companies/%s/edit"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default container((props, onData) => {
    const companyId = props.match.params._id;
    const subscription = Meteor.subscribe('companies.detail', companyId);
    if (subscription.ready()) {
        onData(null, {
            company: Companies.findOne(companyId)
        });
    }
}, ViewCompany);