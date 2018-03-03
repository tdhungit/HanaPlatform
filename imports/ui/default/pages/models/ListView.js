import React, {Component} from 'react';
import {
    Row,
    Col,
    Card
} from 'reactstrap';
import {myModel} from '/imports/common/Model';

class ListView extends Component {
    render() {
        const testCollection = myModel.getCollection('Activities');
        console.log(testCollection.test());
        return (
            <div className="module-ListView animated fadeIn">

            </div>
        );
    }
}

export default ListView;
