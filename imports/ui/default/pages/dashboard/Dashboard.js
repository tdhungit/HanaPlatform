import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {setLoading, setLoaded} from '../../store/app/app.actions';

class Dashboard extends Component {
    render() {
        return (
            <div className="index-Dashboard animated fadeIn">
                <a href="javascript:void(0)" onClick={this.props.setLoading}>Loading</a>
                <br/>
                <a href="javascript:void(0)" onClick={this.props.setLoaded}>Loaded</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setLoading: setLoading,
        setLoaded: setLoaded
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
