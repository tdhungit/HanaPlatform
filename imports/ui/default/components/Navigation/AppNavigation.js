import React from 'react';
import PropTypes from 'prop-types';

const AppNavigation = ({authenticated}) => (
    authenticated ?
        null :
        null
);

AppNavigation.propTypes = {
    authenticated: PropTypes.bool,
};

export default AppNavigation;
