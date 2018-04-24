import React from 'react';
import {Route, Link, matchPath} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {ManagerRouters} from '../../layouts/ManagerRouters';

const findRouteName = url => {
    for (let routerPath in ManagerRouters) {
        const match = matchPath(url, routerPath);
        if (match && match.isExact) {
            return ManagerRouters[routerPath].title;
        }
    }

    return null;
};

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') {
        return paths;
    }

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    return paths;
};

const BreadcrumbsItem = ({match, ...rest}) => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={match.url || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        );
    }

    return null;
};

const Breadcrumbs = ({location: {pathname}, match, ...rest}) => {
    const paths = getPaths(pathname);
    const items = paths.map((path, i) => {
        return <Route key={i++} path={path} component={BreadcrumbsItem}/>
    });

    return (
        <Breadcrumb>
            {items}
        </Breadcrumb>
    );
};

export default props => {
    return (
        <div>
            <Route path="/:path" component={Breadcrumbs} {...props} />
        </div>
    );
};
