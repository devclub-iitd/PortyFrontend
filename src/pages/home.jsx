import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { logout as logout_ } from '../actions/auth';

import axios from '../utility/axios';

import Portfolio from '../components/portfolio';
import Confirmation from '../components/confirmation';
import '../style/home.css';

// import { getProfile as getProfile_ } from '../actions/profile';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(1),
        marginRight: '10px',
        marginLeft: '10px',
        textDecoration: 'none',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    redBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        '&:hover': {
            backgroundColor: '#c0392b',
        },
    },
}));

const portfolio = () => {
    window.location.href = './portfolio';
};

// const Home = ({ logout, getProfile }) => {
const Home = ({ logout }) => {
    useEffect(() => {
        // getProfile();
    }, []);

    const [confirmationState, setConfirmationState] = useState({
        display: false,
        title: '',
        text: '',
    });

    const handleConfirmation = (val) => {
        setConfirmationState({
            ...confirmationState,
            display: val,
        });
    };

    const openConfirmation = (title, text) => {
        setConfirmationState({
            display: true,
            title,
            text,
        });
    };

    const download = async () => {
        try {
            openConfirmation('Alert', 'Attempting to download your profile');
            const res = await axios({
                url: '/api/profile/me',
                method: 'GET',
            });
            const { data } = res;
            const element = document.createElement('a');
            element.setAttribute(
                'href',
                `data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify({ profile: { ...data } })
                )}`
            );
            element.setAttribute('download', 'file.json');
            element.click();
            openConfirmation(
                'Success',
                'Your profile (file.json) has been downloaded successfully!!'
            );
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            openConfirmation(
                'Error',
                'Unable to download your profile at the moment, please try again later'
            );
        }
    };

    const classes = useStyles();

    const { display, title, text } = confirmationState;
    let confirmationContainer;
    if (display) {
        confirmationContainer = (
            <Confirmation
                title={title}
                text={text}
                handleClose={handleConfirmation}
            />
        );
    }
    return (
        <div className="homeCont">
            <div className="homePageTitle">Your Portfolio is ...</div>
            <div className="portfolioContainerFull">
                <Portfolio />
            </div>
            <div className="btnRowHome">
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="delete"
                    className={`${classes.fab} ${classes.redBtn}`}
                    onClick={logout}
                >
                    <PowerSettingsNewIcon className={classes.extendedIcon} />
                    Logout
                </Fab>
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="delete"
                    className={classes.fab}
                    onClick={portfolio}
                >
                    <NavigationIcon className={classes.extendedIcon} />
                    <div className="remDec">Portfolio</div>
                </Fab>
                <Fab
                    variant="extended"
                    color="secondary"
                    aria-label="delete"
                    className={classes.fab}
                    onClick={download}
                >
                    <GetAppIcon className={classes.extendedIcon} />
                    Download
                </Fab>
            </div>
            <AnimatePresence>{confirmationContainer}</AnimatePresence>
        </div>
    );
};

Home.propTypes = {
    logout: PropTypes.func.isRequired,
    // getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

// export default connect(mapStateToProps, { logout_, getProfile_ })(Home);
export default connect(mapStateToProps, { logout: logout_ })(Home);
