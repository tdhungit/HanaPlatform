import React, {Component} from 'react';

class Loading extends Component {
    render() {
        return (
            <div className="text text-center">
                <i className="fa fa-refresh fa-spin"/>
            </div>
        );
    }
}

export default Loading;
