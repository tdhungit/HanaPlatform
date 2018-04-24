import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

import {t, PT} from '/imports/common/Translation';
import Models from '/imports/collections/Models/Models';
import FormComponent from '../models/components/FormComponent';
import ACLRoles from '../../../../collections/ACLRoles/ACLRoles';

class CreateRole extends Component {
    static viewInfo = {controller: 'ACL', action: 'Create'};

    render() {
        const model = Models.getModel('ACLRoles') || ACLRoles.getLayouts();
        
        return (
            <div className="CreateRole animated fadeIn">
                <PT title={t.__('Create Role')}/>
                <Row>
                    <Col md="12">
                        <FormComponent 
                            title={t.__('Create new Role')} 
                            slogan={''} 
                            model={model}
                            record={{}}
                            method="aclRoles.insert" 
                            detailLink="/manager/roles/%s/detail" 
                            listLink="/manager/roles"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateRole;
