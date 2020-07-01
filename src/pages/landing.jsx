import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
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

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
Landing.defaultProps = {
    isAuthenticated: null,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
