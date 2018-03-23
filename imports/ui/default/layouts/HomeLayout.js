import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import NotFound from '../pages/index/NotFound';
import Index from '../pages/index/Index';
import Install from '../pages/index/Install';
import About from '../pages/index/About';

/**
 * Layout & Router for public page
 */
class HomeLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const appProps = this.props;

        return (
            <div className="HanaPlatformHome">
                <main className="mainpage">
                    <Route exact path="/" component={Index} {...appProps}/>
                    <Route exact path="/install" component={Install} {...appProps}/>
                    <Route exact path="/about-us" component={About} {...appProps}/>
                    <Route exact path="/404" component={NotFound} {...appProps}/>
                </main>
            </div>
        );
    }
}

export default HomeLayout;
