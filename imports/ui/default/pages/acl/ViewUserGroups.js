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

class ViewUserGroups extends Component {
    static viewInfo = {controller: 'UserGroups', action: 'List'};

    constructor(props) {
        super(props);

        this.state = {
            userGroups: []
        };
    }

    componentWillMount() {
        Meteor.call('userGroups.TREE', (error, groups) => {
            if (!error) {
                const trees = this.getTrees(groups);
                this.setState({userGroups: trees});
            }
        });
    }

    getTrees(groups) {
        let trees = [];
        for (let idx in groups) {
            let group = groups[idx];
            let tree = {
                title: (<Link to={'/manager/user-groups/' + group._id + '/detail'}>{group.name}</Link>),
                subtitle: group.description,
                expanded: true,
                _id: group._id,
                parent: group.parent
            };

            if (group.children && group.children.length > 0) {
                tree.children = this.getTrees(group.children);
            }

            trees.push(tree);
        }

        return trees;
    }

    updateTree(groups, parent) {
        for (let idx in groups) {
            let group = groups[idx];
            group.parent = parent;
            Meteor.call('userGroups.update', group);

            if (group.children && group.children.length > 0) {
                this.updateTree(group.children, group._id);
            }
        }
    }

    handleChangeGroup(userGroups) {
        this.updateTree(userGroups, 'ROOT');
        this.setState({userGroups: userGroups});
    }

    render() {
        return (
            <div className="ViewUserGroups">
                <PT title={t.__('View User Groups')}/>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-list"></i>
                                <strong><T>View User Groups</T></strong>
                                <div className="card-actions">
                                    <Link to={'/manager/user-groups/create'} title={t.__('Create')}>
                                        <i className="fa fa-plus-circle"/>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div style={{height: 600}}>
                                    <SortableTree
                                        treeData={this.state.userGroups}
                                        onChange={userGroups => this.handleChangeGroup(userGroups)}
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

export default ViewUserGroups;
