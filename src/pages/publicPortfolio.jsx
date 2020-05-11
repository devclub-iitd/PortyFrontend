import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import {
    Link,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller,
} from 'react-scroll';
import { withRouter } from 'react-router';
import Landing from '../components/portfolio/landing';
import About from '../components/portfolio/about';
import Education from '../components/portfolio/education';
import Work from '../components/portfolio/work';
import Volunteer from '../components/portfolio/volunteer';
import Extra from '../components/portfolio/extra';
import Contact from '../components/portfolio/contact';

import Loader from '../components/loader';

import '../style/portfolio.css';

import { getPublicProfile } from '../actions/profile';

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
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const navToHome = () => {
    window.location.href = '../../home';
};

const Portfolio = ({
    match,
    getPublicProfile,
    profile: { loading, profile },
}) => {
    useEffect(() => {
        getPublicProfile(match.params.id);
    }, []);
    const myRef = React.useRef(null);
    const initScroll = () => scrollToRef(myRef);
    const classes = useStyles();
    // const { offsetTop } = myRef.current.offsetTop;

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (!loading && profile !== null) {
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
                    style={{ top: window.innerHeight + 'px' }}
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

    if (!loading && profile === null) {
        return (
            <div>
                <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
                    <Toolbar>
                        <Typography>
                            <span style={{ fontWeight: 700, fontSize: '20px' }}>
                                Portfolio Creator
                            </span>{' '}
                            <span style={{ color: '#3d40d8' }}>
                                | Error 404
                            </span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="noProf">
                    <span style={{ fontSize: '50px' }}>WHOOPS ...</span>
                    <br />
                    <br />
                    <span style={{ fontWeight: '500' }}>
                        No such User profile found
                    </span>
                    <br />
                    Kindly proceed back to home
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={navToHome}
                    >
                        home
                    </Button>
                </div>
            </div>
        );
    }
};

Portfolio.propTypes = {
    getPublicProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getPublicProfile })(
    withRouter(Portfolio)
);
