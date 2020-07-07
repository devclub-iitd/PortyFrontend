import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import InfoIcon from '@material-ui/icons/Info';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {
    createProfile,
    getCurrentProfile as getCurrentProfile_,
} from '../actions/profile';
import { logout as logout_ } from '../actions/auth';

import AlertStatic from '../components/fancyAlertStatic';
import Alert from '../components/fancyAlert';
import Loader from '../components/loader';
import Confirmation from '../components/confirmation';

import Intro from '../components/userDetailDropdowns/intro';
// import Image from '../components/regFinal/image';
// import Account from '../components/regFinal/account';
import About from '../components/userDetailDropdowns/about';
import Location from '../components/userDetailDropdowns/location';
import Work from '../components/userDetailDropdowns/work';
import Volunteer from '../components/userDetailDropdowns/volunteer';
import Education from '../components/userDetailDropdowns/education';
import Award from '../components/userDetailDropdowns/award';
import Publication from '../components/userDetailDropdowns/publication';
import Language from '../components/userDetailDropdowns/language';
import Skill from '../components/userDetailDropdowns/skill';
import Interest from '../components/userDetailDropdowns/interest';
import Reference from '../components/userDetailDropdowns/reference';
import '../style/regFinal.css';

const obj = {};
const retrieveChildData = (type, data) => {
    obj[type] = data;
};

const redirectHome = () => {
    window.location.href = '../home';
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(255,255,255,1)',
        },
        secondary: {
            main: '#3d40d8',
        },
    },
});

class RegFinal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            message: '',
            openDial: false,
            openConfirmation: false,
        };
        this.account = React.createRef();
        this.about = React.createRef();
        this.location = React.createRef();
        this.work = React.createRef();
        this.volunteer = React.createRef();
        this.education = React.createRef();
        this.award = React.createRef();
        this.publication = React.createRef();
        this.skill = React.createRef();
        this.language = React.createRef();
        this.interest = React.createRef();
        this.reference = React.createRef();
        this.handlePanel = this.handlePanel.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.retrieveChildData = retrieveChildData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.openDial = this.openDial.bind(this);
        this.handleCloseMini = this.handleCloseMini.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.redirectHome = redirectHome.bind(this);
    }

    componentDidMount() {
        const { getCurrentProfile } = this.props;
        getCurrentProfile();
    }

    handlePanel(panel) {
        const { expanded } = this.state;
        if (expanded === panel) {
            this.setState({
                expanded: false,
            });
        } else {
            this.setState({
                expanded: panel,
            });
        }
    }

    async handleSumbit(event) {
        event.preventDefault();
        this.openDial('Please wait while we create your profile...');
        this.about.current.callApiRequest();
        this.location.current.callApiRequest();
        this.work.current.callApiRequest();
        this.volunteer.current.callApiRequest();
        this.education.current.callApiRequest();
        this.award.current.callApiRequest();
        this.publication.current.callApiRequest();
        this.skill.current.callApiRequest();
        this.language.current.callApiRequest();
        this.interest.current.callApiRequest();
        this.reference.current.callApiRequest();

        const { createProfile: createProfile_ } = this.props;
        await createProfile_(obj, false);
        const { alert } = this.props;
        const len = alert.length;
        if (alert[len - 1].alertType !== 'blue') {
            this.setState({
                openDial: false,
                open: true,
                alertTitle: 'Whoops!!',
                alertContent: alert[len - 1].msg,
            });
        } else if (alert[len - 1].alertType === 'blue') {
            this.setState({
                openDial: false,
                openStatic: true,
                alertTitle: 'Profile has been created!',
                alertContent:
                    'You will be redirected to the Home page...Please click done to continue',
            });
        }
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleOpen() {
        this.openDial(
            'Whoops...Please check you have filled all your details and try again.'
        );
    }

    openDial(mess) {
        this.setState({
            openDial: true,
            message: mess,
        });
    }

    handleCloseMini() {
        this.setState({
            openDial: false,
        });
    }

    handleConfirmation(val) {
        this.setState({
            openConfirmation: val,
        });
    }

    render() {
        const {
            expanded,
            open,
            alertTitle,
            alertContent,
            openStatic,
            openDial,
            message,
            openConfirmation,
        } = this.state;
        const { user, profile, logout } = this.props;
        if (!profile.loading && profile.profile) {
            return <Redirect to="/home" />;
        }
        let confirmation;
        if (!profile.loading) {
            if (openConfirmation) {
                confirmation = (
                    <Confirmation
                        title="Alert"
                        text="This field has already reached it's maximum position, you can not move it any further. Please try moving a different field"
                        handleClose={this.handleConfirmation}
                    />
                );
            }
            return (
                <MuiThemeProvider theme={theme}>
                    <div style={{ paddingBottom: 100 }}>
                        <Intro name={user.name} caption="block" />
                        <form onSubmit={this.handleSumbit}>
                            {/* <Account
              ref={this.account}
              expanded={expanded}
              action={() => this.handlePanel('accountPanel')}
            />  */}
                            <About
                                ref={this.about}
                                expanded={expanded}
                                action={() => this.handlePanel('aboutPanel')}
                                mode="register"
                                senData={retrieveChildData}
                            />
                            <Location
                                ref={this.location}
                                expanded={expanded}
                                action={() => this.handlePanel('locationPanel')}
                                mode="register"
                                senData={retrieveChildData}
                            />
                            <Education
                                ref={this.education}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('educationPanel')
                                }
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Work
                                ref={this.work}
                                expanded={expanded}
                                action={() => this.handlePanel('workPanel')}
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Volunteer
                                ref={this.volunteer}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('volunteerPanel')
                                }
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Language
                                ref={this.language}
                                expanded={expanded}
                                action={() => this.handlePanel('languagePanel')}
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <div className="regSubTitle">Optionals -</div>
                            <Award
                                ref={this.award}
                                expanded={expanded}
                                action={() => this.handlePanel('awardPanel')}
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Publication
                                ref={this.publication}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('publicationPanel')
                                }
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Skill
                                ref={this.skill}
                                expanded={expanded}
                                action={() => this.handlePanel('skillPanel')}
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Interest
                                ref={this.interest}
                                expanded={expanded}
                                action={() => this.handlePanel('interestPanel')}
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <Reference
                                ref={this.reference}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('referencePanel')
                                }
                                mode="register"
                                senData={retrieveChildData}
                                handleAlert={this.handleConfirmation}
                            />
                            <div className="btnContainer">
                                <Button
                                    variant="contained"
                                    style={{ padding: '12px 50px' }}
                                    color="secondary"
                                    type="submit"
                                    onClick={this.handleOpen}
                                >
                                    Done
                                </Button>
                            </div>
                        </form>
                        <AlertStatic
                            handleRedirect={redirectHome}
                            open={openStatic}
                            title={alertTitle}
                        >
                            {alertContent}
                        </AlertStatic>
                        <Alert
                            open={open}
                            handleClose={this.handleClose}
                            title={alertTitle}
                        >
                            {alertContent}
                        </Alert>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={openDial}
                            autoHideDuration={6000}
                            onClose={this.handleCloseMini}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={
                                <span
                                    id="message-id"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <InfoIcon style={{ marginRight: '10px' }} />
                                    {message}
                                </span>
                            }
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={this.handleCloseMini}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                        <AppBar
                            style={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <Toolbar>
                                <Typography>
                                    <span
                                        style={{
                                            fontWeight: 700,
                                            fontSize: '20px',
                                        }}
                                    >
                                        Portfolio Creator
                                    </span>{' '}
                                    <span style={{ color: '#3d40d8' }}>
                                        | Register
                                    </span>
                                </Typography>
                                <button
                                    type="button"
                                    className="headerLogoutBtn"
                                    onClick={() => logout()}
                                >
                                    Logout
                                </button>
                            </Toolbar>
                        </AppBar>
                    </div>
                    <AnimatePresence>{confirmation}</AnimatePresence>
                </MuiThemeProvider>
            );
        }
        return <Loader />;
    }
}

RegFinal.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alert: PropTypes.oneOfType([PropTypes.object]).isRequired,
    profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
    logout: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    alert: state.alert,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    createProfile,
    getCurrentProfile: getCurrentProfile_,
    logout: logout_,
})(withRouter(RegFinal));
