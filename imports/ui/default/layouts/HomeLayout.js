import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {HomeRouters} from './ManagerRouters';
import Authenticate from '../components/Router/Authenticate';

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
            if (route.authenticated) {
                routers.push(
                    <Authenticate exact {...appProps} key={path}
                                  path={path}
                                  component={route.component}/>
                );
            } else {
                routers.push(
                    <Route key={path} exact path={path} component={route.component} {...appProps}/>
                );
            }
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
