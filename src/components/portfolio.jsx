import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from './portfolio/landing';
import About from './portfolio/about';
import Education from './portfolio/education';
import Work from './portfolio/work';
import Volunteer from './portfolio/volunteer';
import Extra from './portfolio/extra';
import Contact from './portfolio/contact';
import '../style/portfolio.css';
import { getProfile as getProfile_ } from '../actions/profile';

const navToReg = () => {
    window.location.href = '../register';
};

const Portfolio = ({ getProfile, profile: { profile, loading } }) => {
    useEffect(() => {
        getProfile();
    }, [getProfile]);

    if (loading) {
        return (
            <div
                className="portfolioContainer1"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: ' center',
                    border: '0px',
                }}
            >
                <CircularProgress color="secondary" />
            </div>
        );
    }
    if (!loading && profile !== null) {
        let volunteerSection;
        const { volunteer } = profile;
        if (
            volunteer.length > 0 &&
            volunteer[0].organisation.trim().length > 0 &&
            volunteer[0].summary.trim().length > 0
        ) {
            volunteerSection = <Volunteer volunteer={profile.volunteer} />;
        }
        return (
            <Paper className="portfolioContainer1" elavation={4}>
                <Landing
                    name={profile.user.name}
                    label={profile.about.label}
                    img={profile.about.imgUrl}
                />
                <div
                    className="portfolioBodyCont"
                    style={{ top: `${window.innerHeight - 54}px` }}
                >
                    <About summary={profile.about} top={window.innerHeight} />
                    <Education education={profile.education} />
                    <Work work={profile.work} />
                    {volunteerSection}
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
            </Paper>
        );
    }
    if (!loading && profile === null) {
        navToReg(); // class = noProf
    }

    return <div className="noProf">No Profile Loaded</div>;
};

Portfolio.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProfile: getProfile_ })(Portfolio);
