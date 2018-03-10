import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="index-Dashboard animated fadeIn">
                <a href="javascript:void(0)" onClick={() => this.props.appLoading()}>Loading</a>
                <br/>
                <a href="javascript:void(0)" onClick={() => this.props.appLoading(false)}>Loaded</a>
            </div>
        );
    }
}

export default Dashboard;
