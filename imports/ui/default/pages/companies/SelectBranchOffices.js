import React, {Component} from 'react';
import BranchOffices from '../../../../collections/BranchOffices/BranchOffices';

class SelectBranchOffices extends Component {
    componentWillMount() {
        this.limit = BranchOffices.getLimit();
        this.pagination = BranchOffices.pagination();
    }

    render() {
        const {limit, pagination} = this.props;
        return (
            <div></div>
        );
    }
}