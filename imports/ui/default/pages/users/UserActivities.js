import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withRouter} from 'react-router';
import {
    Input
} from 'reactstrap';

import {ImageTag} from '../../helpers/tags/MediaImage';

class UserActivities extends Component {
    render() {
        const currentUser = Meteor.user();

        return (
            <div>
                <div className="post">
                    <div className="user-block">
                        <ImageTag
                            media={currentUser.profile && currentUser.profile.avatar ? currentUser.profile.avatar : ''}
                            className="img-avatar" alt={currentUser && currentUser.emails[0].address}/>
                        <span className="username">{currentUser.username}</span>
                        <span className="description">description</span>
                        <div className="post-detail">Activity</div>
                        <ul className="list-inline">
                            <li>
                                <a href="#" className="link-black text-sm">
                                    <i className="fa fa-share margin-r-5"></i> Share
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link-black text-sm">
                                    <i className="fa fa-thumbs-o-up margin-r-5"></i> Like
                                </a>
                            </li>
                            <li className="pull-right">
                                <a href="#" className="link-black text-sm">
                                    <i className="fa fa-comments-o margin-r-5"></i> Comments (5)
                                </a>
                            </li>
                        </ul>
                        <Input bsSize="sm" type="text" placeholder="Type a comment"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserActivities);
