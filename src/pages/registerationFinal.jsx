import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import InfoIcon from '@material-ui/icons/Info';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createProfile, getCurrentProfile } from '../actions/profile';

import AlertStatic from '../components/fancyAlertStatic';
import Alert from '../components/fancyAlert';

import Intro from '../components/regFinal/intro';
// import Image from '../components/regFinal/image';
// import Account from '../components/regFinal/account';
import About from '../components/regFinal/about';
import Location from '../components/regFinal/location';
import Work from '../components/regFinal/work';
import Volunteer from '../components/regFinal/volunteer';
import Education from '../components/regFinal/education';
import Award from '../components/regFinal/award';
import Publication from '../components/regFinal/publication';
import Language from '../components/regFinal/language';
import Skill from '../components/regFinal/skill';
import Interest from '../components/regFinal/interest';
import Reference from '../components/regFinal/reference';
import '../style/regFinal.css';

const obj = {};

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

function retrieveChildData(type, data) {
    obj[type] = data;
}

function redirectHome() {
    window.location.href = '../home';
}

class RegFinal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            message: '',
            openDial: false,
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
        this.redirectHome = redirectHome.bind(this);
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
        const { alert } = this.props;

        const { createProfile: createProfile_ } = this.props;
        await createProfile_(obj, false);
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
            'Whoops...Please check you have filled all your details and try again'
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

    render() {
        const {
            expanded,
            open,
            alertTitle,
            alertContent,
            openStatic,
            openDial,
            message,
        } = this.state;
        const { user } = this.props;
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
                            senData={this.retrieveChildData}
                        />
                        <Location
                            ref={this.location}
                            expanded={expanded}
                            action={() => this.handlePanel('locationPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Education
                            ref={this.education}
                            expanded={expanded}
                            action={() => this.handlePanel('educationPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Work
                            ref={this.work}
                            expanded={expanded}
                            action={() => this.handlePanel('workPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Volunteer
                            ref={this.volunteer}
                            expanded={expanded}
                            action={() => this.handlePanel('volunteerPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Language
                            ref={this.language}
                            expanded={expanded}
                            action={() => this.handlePanel('languagePanel')}
                            senData={this.retrieveChildData}
                        />
                        <div className="regSubTitle">Optionals -</div>
                        <Award
                            ref={this.award}
                            expanded={expanded}
                            action={() => this.handlePanel('awardPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Publication
                            ref={this.publication}
                            expanded={expanded}
                            action={() => this.handlePanel('publicationPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Skill
                            ref={this.skill}
                            expanded={expanded}
                            action={() => this.handlePanel('skillPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Interest
                            ref={this.interest}
                            expanded={expanded}
                            action={() => this.handlePanel('interestPanel')}
                            senData={this.retrieveChildData}
                        />
                        <Reference
                            ref={this.reference}
                            expanded={expanded}
                            action={() => this.handlePanel('referencePanel')}
                            senData={this.retrieveChildData}
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
                        handleRedirect={this.redirectHome}
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
                        </Toolbar>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        );
    }
}

RegFinal.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alert: PropTypes.oneOfType([PropTypes.object]).isRequired,
    createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    alert: state.alert,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(RegFinal)
);
