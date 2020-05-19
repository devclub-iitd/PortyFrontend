// TODO - LINT FIXES FOR THIS BY FILE BY JATIN
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loader from './loader';

const PrivateRoute = ({
    // TODO: JATIN FIX
    // eslint-disable-next-line react/prop-types
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => {
            if (loading) {
                return <Loader />;
            }
            if (!loading && !isAuthenticated) {
                return <Redirect to="/" />;
            }
            return <Component {...props} />;
        }}
    />
);
PrivateRoute.propTypes = {
    auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
