import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import NotFound from '../pages/index/NotFound';
import Index from '../pages/index/Index';
import About from '../pages/index/About';

class HomeLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PenguinPlatformHome">
                <main className="mainpage">
                    <Route exact path="/" component={Index}/>
                    <Route exact path="/about-us" component={About}/>
                    <Route exact path="/404" component={NotFound}/>
                </main>
            </div>
        );
    }
}

export default HomeLayout;
