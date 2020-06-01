import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '../components/fancyAlert';
import { createProfile, getFullProfile } from '../actions/profile';

import Intro from '../components/userDetailDropdowns/intro';
import Image from '../components/userDetailDropdowns/image';
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
import Loader from '../components/loader';

const obj = {};

const retrieveChildData = (type, data) => {
    obj[type] = data;
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

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            open: false,
            openMini: false,
            message: '',
            alertTitle: '',
            alertContent: '',
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
        // this.retrieveChildData = this.retrieveChildData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCloseMini = this.handleCloseMini.bind(this);
    }

    componentDidMount() {
        const { getFullProfile: getFullProfile_ } = this.props;
        getFullProfile_();
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

    // retrieveChildData(type, data) {
    //     obj[type] = data;
    // }

    async handleSumbit(event) {
        event.preventDefault();
        this.setState({
            message: 'Please wait while we update your profile',
        });
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
        await createProfile_(obj, true);

        const { alert } = this.props;
        const len = alert.length;
        if (alert[len - 1].alertType !== 'blue') {
            this.setState({
                open: true,
                openMini: false,
                alertTitle: 'Whoops!!',
                alertContent: alert[len - 1].msg,
            });
        } else if (alert[len - 1].alertType === 'blue') {
            this.setState({
                open: true,
                openMini: false,
                alertTitle: 'Profile updated successfully!',
                alertContent:
                    'Kindly check the home page to view your updated portfolio',
            });
        }
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleCloseMini() {
        this.setState({
            openMini: false,
        });
    }

    handleOpen() {
        this.setState({
            openMini: true,
            message: 'Whoops...Please check you have filled all the details',
        });
    }

    render() {
        const { profile: overallProfile, user } = this.props;
        const { loading, profile } = overallProfile;
        const {
            expanded,
            open,
            alertTitle,
            alertContent,
            openMini,
            message,
        } = this.state;

        if (loading) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }

        if (!loading && profile !== null) {
            return (
                <MuiThemeProvider theme={theme}>
                    <div style={{ paddingBottom: 100 }}>
                        <Image img={profile.about.imgUrl} />
                        <Intro name={user.name} caption="none" />
                        <form onSubmit={this.handleSumbit}>
                            <About
                                ref={this.about}
                                expanded={expanded}
                                action={() => this.handlePanel('aboutPanel')}
                                existingData={profile.about}
                                existingContactData={profile.user}
                                senData={retrieveChildData}
                                mode="edit"
                            />
                            <Location
                                ref={this.location}
                                expanded={expanded}
                                action={() => this.handlePanel('locationPanel')}
                                existingData={profile.location}
                                senData={retrieveChildData}
                                mode="edit"
                            />
                            <Education
                                ref={this.education}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('educationPanel')
                                }
                                existingData={profile.education}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Work
                                ref={this.work}
                                expanded={expanded}
                                action={() => this.handlePanel('workPanel')}
                                existingData={profile.work}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Volunteer
                                ref={this.volunteer}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('volunteerPanel')
                                }
                                existingData={profile.volunteer}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Language
                                ref={this.language}
                                expanded={expanded}
                                action={() => this.handlePanel('languagePanel')}
                                existingData={profile.languages}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <div className="regSubTitle">Optionals -</div>
                            <Award
                                ref={this.award}
                                expanded={expanded}
                                action={() => this.handlePanel('awardPanel')}
                                existingData={profile.awards}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Publication
                                ref={this.publication}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('publicationPanel')
                                }
                                existingData={profile.publications}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Skill
                                ref={this.skill}
                                expanded={expanded}
                                action={() => this.handlePanel('skillPanel')}
                                existingData={profile.skills}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Interest
                                ref={this.interest}
                                expanded={expanded}
                                action={() => this.handlePanel('interestPanel')}
                                existingData={profile.interests}
                                mode="edit"
                                senData={retrieveChildData}
                            />
                            <Reference
                                ref={this.reference}
                                expanded={expanded}
                                action={() =>
                                    this.handlePanel('referencePanel')
                                }
                                existingData={profile.references}
                                mode="edit"
                                senData={retrieveChildData}
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
                            open={openMini}
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
                    </div>
                </MuiThemeProvider>
            );
        }

        if (!loading && profile == null) {
            return (
                <div className="noProf noProfLarge">
                    Please create a profile first ...
                    <br />
                </div>
            );
        }

        return (
            <div className="noProf noProfLarge">
                Whoop!! An error occurred ...
                <br />
            </div>
        );
    }
}

Edit.propTypes = {
    getFullProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object]).isRequired,
    profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alert: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    user: state.auth.user,
    alert: state.alert,
});

export default connect(mapStateToProps, { createProfile, getFullProfile })(
    Edit
);
