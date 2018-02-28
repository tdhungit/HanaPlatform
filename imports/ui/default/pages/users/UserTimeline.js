import React, {Component} from 'react';
import {withRouter} from 'react-router';

class UserTimeline extends Component {
    render() {
        return (
            <ul className="timeline timeline-inverse">
                <li className="time-label">
                    <span className="bg-red">
                      10 Feb. 2014
                    </span>
                </li>
                <li>
                    <i className="fa fa-envelope bg-blue"></i>

                    <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o"></i> 12:05</span>

                        <h3 className="timeline-header"><a href="#">Support Team</a> sent you an email</h3>

                        <div className="timeline-body">
                            accepted your friend request
                        </div>
                        <div className="timeline-footer">
                            <a className="btn btn-primary btn-sm">Read more</a>
                            <a className="btn btn-danger btn-sm">Delete</a>
                        </div>
                    </div>
                </li>
                <li>
                    <i className="fa fa-user bg-cyan"></i>

                    <div className="timeline-item">
                        <span className="time"><i className="fa fa-clock-o"></i> 5 mins ago</span>

                        <h3 className="timeline-header no-border">
                            <a href="#">Sarah Young</a> accepted your friend request
                        </h3>
                    </div>
                </li>
            </ul>
        );
    }
}

export default withRouter(UserTimeline);
