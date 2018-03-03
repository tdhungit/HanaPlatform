import React, {Component} from 'react';
import {
    Row,
    Col,
    Card
} from 'reactstrap';

import {myModel} from '/imports/common/Model';
import {t, T, PT} from '/imports/common/Translation';

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
