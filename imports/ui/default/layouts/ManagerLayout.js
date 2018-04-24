import React, {Component} from 'react';
import {Container} from 'reactstrap';

import {ManagerRouters} from './ManagerRouters';
import Authenticate from '../components/Router/Authenticate';
import Header from '../components/Header/Header';
import AppNavigation from '../components/Navigation/AppNavigation';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Footer from '../components/Footer/Footer';

/**
 * Layout & Router for manage page
 */
class ManagerLayout extends Component {
    renderRouters() {
        const appProps = this.props;
        let routers = [];
        for (let path in ManagerRouters) {
            let route = ManagerRouters[path];
            routers.push(
                <Authenticate exact {...appProps} key={path}
                              path={path}
                              component={route.component}/>
            )
        }

        return routers;
    }

    render() {
        const appProps = this.props;
        return (
            <div className="HanaPlatformManager app">
                <Header {...appProps}/>
                <div className="app-body">
                    <AppNavigation {...appProps}/>
                    <Sidebar {...appProps}/>
                    <main className="main">
                        <Breadcrumb {...appProps}/>
                        <Container fluid>
                            {this.renderRouters()}
                        </Container>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default ManagerLayout;
