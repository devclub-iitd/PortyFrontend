import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import BackupIcon from '@material-ui/icons/Backup';
import IconButton from '@material-ui/core/IconButton';
import queryString from 'query-string';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { logout as logout_ } from '../actions/auth';

import axios from '../utility/axios';

import Portfolio1 from './portfolio';
import Portfolio2 from './portfolio_2';
import Portfolio3 from './portfolio_3';
import Portfolio4 from './portfolio_4';
import Portfolio5 from './portfolio_5';
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
    blackBtn: {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(10, 10, 10, 0.9)',
        },
    },
}));

const previewMapping = {
    0: Portfolio1,
    1: Portfolio2,
    2: Portfolio3,
    3: Portfolio4,
    4: Portfolio5,
};

// const Home = ({ logout, getProfile }) => {
const Home = (props) => {
    const { urlQuery } = props;

    const [confirmationState, setConfirmationState] = useState({
        display: false,
        title: '',
        text: '',
        reload: false,
        redirection: false,
        redirectionUrl: '',
    });

    const handleConfirmation = (val) => {
        setConfirmationState({
            ...confirmationState,
            display: val,
        });
        const { reload } = confirmationState;
        if (reload) {
            window.location.href = '/home';
        }
    };

    const openConfirmation = (title, text, reload = false) => {
        setConfirmationState({
            display: true,
            title,
            text,
            reload,
        });
    };

    useEffect(() => {
        const urlQueryObject = queryString.parse(urlQuery);
        const { status, redirectUrl } = urlQueryObject;
        if (status) {
            if (status !== 'confirmation') {
                let title;
                let text;
                if (status === 'success') {
                    title = 'Success';
                    text =
                        'Your portfolio has succesfully been deployed to github pages';
                    openConfirmation(title, text);
                } else if (status === 'error') {
                    title = 'Error';
                    text =
                        'We were unable to deploy your portfolio to github at this moment. Please try again later.';
                    openConfirmation(title, text);
                }
            } else if (status === 'confirmation') {
                const title = 'Confirmation';
                const text =
                    'Are you sure you want to Proceed? This will delete your existing github pages repository and create a new one with your chosen portfolio template.';
                setConfirmationState({
                    display: true,
                    title,
                    text,
                    reload: true,
                    redirection: true,
                    redirectionUrl: redirectUrl,
                });
            }
        }
    }, [urlQuery]);

    const [portfolioPreview, setPortfolioPreview] = useState(0);

    const handlePortfolioPreview = (increment) => {
        const mod = Object.keys(previewMapping).length;
        if (increment) {
            setPortfolioPreview((prevState) => {
                return (prevState + 1) % mod;
            });
        } else {
            setPortfolioPreview((prevState) => {
                const newVal = (prevState - 1) % mod;
                return newVal >= 0 ? newVal : newVal + mod;
            });
        }
    };

    const navToPortfolio = () => {
        let navVal = '';
        if (portfolioPreview > 0) {
            navVal = portfolioPreview + 1;
        }
        window.location.href = `./portfolio${navVal}`;
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
    const handleGithubDeployment = () => {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        let navVal = '';
        if (portfolioPreview > 0) {
            navVal = portfolioPreview + 1;
        }
        const redirectUri = `https://portfolioback.devclub.in/api/user/github_deploy?theme=${navVal}`;
        window.location.href = `https://github.com/login/oauth/authorize?scope=public_repo%20delete_repo&client_id=${clientId}&redirect_uri=${redirectUri}`;
        // openConfirmation(
        //     'Surprise',
        //     'This feature is currently under development. We are hard at work to bring it to you very soon!'
        // );
    };

    const handleLogout = async () => {
        const { logout } = props;
        try {
            await logout();
        } catch (_) {
            openConfirmation(
                'Error',
                'Unable to log you out, please try again later'
            );
        }
    };

    const classes = useStyles();

    const {
        display,
        title,
        text,
        redirection,
        redirectionUrl,
    } = confirmationState;
    let confirmationContainer;
    if (display) {
        confirmationContainer = (
            <Confirmation
                title={title}
                text={text}
                confirmation={redirection}
                handleClose={handleConfirmation}
                redirectUrl={redirectionUrl}
            />
        );
    }
    const PortfolioName = previewMapping[portfolioPreview];
    const portfolioPreviewContainer = <PortfolioName preview />;
    let portfolioPreviewNavButtonContainer;
    const { profile } = props;
    if (profile) {
        portfolioPreviewNavButtonContainer = (
            <ButtonGroup
                color="secondary"
                aria-label="Preview Navigation Buttons"
                size="large"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '50px',
                }}
            >
                <IconButton
                    aria-label="Previous Design"
                    onClick={() => {
                        handlePortfolioPreview(false);
                    }}
                >
                    <ArrowLeft />
                </IconButton>
                <IconButton
                    aria-label="Next Design"
                    onClick={() => {
                        handlePortfolioPreview(true);
                    }}
                >
                    <ArrowRight />
                </IconButton>
            </ButtonGroup>
        );
    }
    return (
        <div className="homeCont">
            <div className="homePageTitle">Your Portfolio is ...</div>
            <div className="portfolioContainer">
                {portfolioPreviewContainer}
            </div>
            <div className="btnRowHome">
                <div className="portfolioHomePreviewNavContainer">
                    {portfolioPreviewNavButtonContainer}
                </div>
                <div className="portfolioHomeActionButtons">
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="Logout"
                        className={`${classes.fab} ${classes.redBtn}`}
                        onClick={handleLogout}
                    >
                        <PowerSettingsNewIcon
                            className={classes.extendedIcon}
                        />
                        Logout
                    </Fab>
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="View Portfolio"
                        className={classes.fab}
                        onClick={navToPortfolio}
                    >
                        <NavigationIcon className={classes.extendedIcon} />
                        <div className="remDec">Portfolio</div>
                    </Fab>
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="Deploy to github"
                        className={`${classes.fab} ${classes.blackBtn}`}
                        onClick={handleGithubDeployment}
                    >
                        <BackupIcon className={classes.extendedIcon} />
                        Github
                    </Fab>
                    <Fab
                        variant="extended"
                        color="secondary"
                        aria-label="Download"
                        className={classes.fab}
                        onClick={download}
                    >
                        <GetAppIcon className={classes.extendedIcon} />
                        Download
                    </Fab>
                </div>
            </div>
            <AnimatePresence>{confirmationContainer}</AnimatePresence>
        </div>
    );
};

Home.propTypes = {
    logout: PropTypes.func.isRequired,
    profile: PropTypes.oneOfType([PropTypes.object, null]).isRequired,
    urlQuery: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    alert: state.alert,
    profile: state.profile.profile,
});

export default connect(mapStateToProps, { logout: logout_ })(Home);
