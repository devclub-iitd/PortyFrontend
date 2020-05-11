import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import HeaderLogin from '../components/headerLogin';
import Loader from '../components/loader';

const Landing = ({ isAuthenticated, auth: { loading } }) => {
    if (loading) {
        return <Loader />;
    }

    if (!loading && isAuthenticated) {
        return <Redirect to="/home" />;
    }
    return (
        <div>
            <HeaderLogin />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
