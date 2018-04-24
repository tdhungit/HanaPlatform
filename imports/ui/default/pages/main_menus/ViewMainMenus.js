import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

import {T, t, PT} from '/imports/common/Translation';

class ViewMainMenus extends Component {
    static viewInfo = {controller: 'MainMenus', action: 'List'};

    constructor(props) {
        super(props);

        this.state = {
            menusTree: []
        };
    }

    componentWillMount() {
        Meteor.call('mainMenus.Nav', (error, response) => {
            if (!error) {
                let menusTree = [];
                for (let idx in response) {
                    let menu = response[idx];
                    let menuTree = {
                        _id: menu._id,
                        weight: menu.weight,
                        parent: menu.parent,
                        title: (<Link to={'/manager/main-menus/' + menu._id + '/edit'}>{menu.name}</Link>),
                        subtitle: (
                            <span>
                                <i className={menu.icon}/>&nbsp;&nbsp;&nbsp;
                                <span>{menu.url}</span>&nbsp;&nbsp;&nbsp;
                                <span>Title: {menu.title ? 'true' : 'false'}</span>&nbsp;&nbsp;&nbsp;
                                <span>Divider: {menu.divider ? 'true' : 'false'}</span>&nbsp;&nbsp;&nbsp;
                                {menu.badge && menu.badge.variant ?
                                    <span>Badge: {menu.badge.variant} - {menu.badge.text}</span> : null}
                            </span>
                        )
                    };

                    if (menu.children) {
                        menuTree.expanded = true;
                        menuTree.children = [];
                        for (let idx2 in menu.children) {
                            let child_menu = menu.children[idx2];
                            menuTree.children.push({
                                _id: child_menu._id,
                                weight: child_menu.weight,
                                parent: child_menu.parent,
                                title: (<Link
                                    to={'/manager/main-menus/' + child_menu._id + '/edit'}>{child_menu.name}</Link>),
                                subtitle: (
                                    <span>
                                        <i className={child_menu.icon}/>&nbsp;&nbsp;&nbsp;
                                        <span>{child_menu.url}</span>&nbsp;&nbsp;&nbsp;
                                        <span>Title: {child_menu.title ? 'true' : 'false'}</span>&nbsp;&nbsp;&nbsp;
                                        <span>Divider: {child_menu.divider ? 'true' : 'false'}</span>&nbsp;&nbsp;&nbsp;
                                        {child_menu.badge && child_menu.badge.variant ?
                                            <span>Badge: {child_menu.badge.variant} - {child_menu.badge.text}</span> : null}
                                    </span>
                                )
                            });
                        }
                    }

                    menusTree.push(menuTree);
                }

                this.setState({menusTree: menusTree});
            }
        });
    }

    handleChangeMenu(menusTree) {
        let menusTreeNew = [];
        for (let idx in menusTree) {
            let menu = menusTree[idx];
            menu.weight = parseInt(idx) + 1;
            menu.parent = 'ROOT';
            Meteor.call('mainMenus.update', menu);

            if (menu.children) {
                for (let idx2 in menu.children) {
                    let menu_child = menu.children[idx2];
                    menu_child.weight = parseInt(idx2) + 1;
                    menu_child.parent = menu._id;
                    Meteor.call('mainMenus.update', menu_child);
                }
            }

            menusTreeNew.push(menu);
        }

        this.setState({menusTree: menusTreeNew});
    }

    render() {
        return (
            <div className="ViewMainMenus animated fadeIn">
                <PT title={t.__('View Main Menus')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-list"></i>
                                <strong><T>View Main Menus</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/main-menus/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div style={{height: 600}}>
                                    <SortableTree
                                        treeData={this.state.menusTree}
                                        onChange={menusTree => this.handleChangeMenu(menusTree)}
                                        maxDepth={2}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewMainMenus;
