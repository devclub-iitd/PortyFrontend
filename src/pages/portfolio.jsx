import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { animateScroll as scroll } from 'react-scroll';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Landing from '../components/portfolio/landing';
import About from '../components/portfolio/about';
import Education from '../components/portfolio/education';
import Work from '../components/portfolio/work';
import Volunteer from '../components/portfolio/volunteer';
import Extra from '../components/portfolio/extra';
import Contact from '../components/portfolio/contact';

import Loader from '../components/loader';

import '../style/portfolio.css';

import { getCurrentProfile as getCurrentProfile_ } from '../actions/profile';

const useStyles = makeStyles(() => ({
    button: {
        width: '150px',
        height: '40px',
        marginTop: '30px',
        borderRadius: '5px',
    },
}));

const scrollToRef = () => {
    scroll.scrollTo(window.innerHeight);
};

const navToReg = () => {
    window.location.href = '../register';
};
const Portfolio = ({
    getCurrentProfile,
    isAuthenticated,
    auth,
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    });

    const classes = useStyles();
    const initScroll = () => scrollToRef();

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (!loading && profile !== null && !auth.loading && auth.isAuthenticated) {
        return (
            <div className="portfolioContainerFull">
                <Landing
                    name={profile.user.name}
                    label={profile.about.label}
                    img={profile.about.imgUrl}
                    initScroll={initScroll}
                />
                <div
                    className="portfolioBodyCont"
                    style={{ top: `${window.innerHeight}px` }}
                >
                    <About summary={profile.about} top={window.innerHeight} />
                    <Education education={profile.education} />
                    <Work work={profile.work} />
                    <Volunteer volunteer={profile.volunteer} />
                    <Extra
                        awards={profile.awards}
                        publications={profile.publications}
                        languages={profile.languages}
                        skills={profile.skills}
                    />
                    <Contact
                        email={profile.user.email}
                        phone={profile.about.number}
                        location={profile.location}
                    />
                </div>
            </div>
        );
    }

    if (!loading && profile === null && !auth.loading && auth.isAuthenticated) {
        return (
            <div>
                <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
                    <Toolbar>
                        <Typography>
                            <span style={{ fontWeight: 700, fontSize: '20px' }}>
                                Portfolio Creator
                            </span>{' '}
                            <span style={{ color: '#3d40d8' }}>
                                | Whoops :(
                            </span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="noProf noProfLarge">
                    No profile found ...
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={navToReg}
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }

    if (!loading && !isAuthenticated && !auth.loading) {
        return <div>u need to be logged in to access this.please login</div>;
    }

    return <div>hello world</div>;
};

Portfolio.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
    profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile_ })(Portfolio);
