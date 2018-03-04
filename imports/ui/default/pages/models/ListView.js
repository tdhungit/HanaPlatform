import React, {Component} from 'react';
import {
    Row,
    Col,
    Card
} from 'reactstrap';

import {myModel} from '/imports/common/Model';
import {t, T, PT} from '/imports/common/Translation';
import {FieldEditView} from '../../components/Fields/FieldView';

class ListView extends Component {
    onChange() {

    }
    render() {
        const testCollection = myModel.getCollection('Activities');
        console.log(testCollection.test());
        return (
            <div className="module-ListView animated fadeIn">
                <FieldEditView type="texteditor" name="test" onChange={this.onChange.bind(this)}/>
            </div>
        );
    }
}

export default ListView;
