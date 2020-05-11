import React, { useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import Portfolio from '../components/portfolio';
import '../style/home.css';

import { getProfile } from '../actions/profile';

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

const download = () => {
    window.location.href = 'http://localhost:5000/api/profile/download';
};
const portfolio = () => {
    window.location.href = './portfolio';
};

const Home = ({ logout, getProfile }) => {
    useEffect(() => {
        //getProfile();
    }, []);
    const classes = useStyles();
    return (
        <div className="homeCont">
            <div className="homePageTitle">Your Portfolio is ...</div>
            <Portfolio />
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
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps, { logout, getProfile })(Home);
