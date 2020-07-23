import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
            <div className="bottomButtonContainer">
                <Button
                    variant="outlined"
                    color="primary"
                    href="https://docs.google.com/forms/d/e/1FAIpQLScPwizIa6I62uZWx5IX3VxKFJKm8x-IH2j17eGkPl_woJMTeA/viewform?entry.68215081=Portfolio"
                    target="_blank"
                    style={{ margin: '6px' }}
                >
                    Feedback
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    href="https://devclub.in/"
                    target="_blank"
                    style={{ margin: '6px' }}
                >
                    About Us
                </Button>
            </div>
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
