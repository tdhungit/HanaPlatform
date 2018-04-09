import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {HomeRouters} from './ManagerRouters';

/**
 * Layout & Router for public page
 */
class HomeLayout extends Component {
    constructor(props) {
        super(props);
    }

    renderRouters() {
        const appProps = this.props;
        let routers = [];
        for (let path in HomeRouters) {
            let route = HomeRouters[path];
            routers.push(
                <Route key={path} exact path={path} component={route.component} {...appProps}/>
            )
        }

        return routers;
    }

    render() {
        return (
            <div className="HanaPlatformHome">
                <main className="mainpage">
                    {this.renderRouters()}
                </main>
            </div>
        );
    }
}

export default HomeLayout;
