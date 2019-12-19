import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Landing from './portfolio/landing';
import About from './portfolio/about';
import Education from './portfolio/education';
import Work from './portfolio/work';
import Volunteer from './portfolio/volunteer';
import Extra from './portfolio/extra';
import Contact from './portfolio/contact';
import '../style/portfolio.css';
import Loader from './loader';
import { getCurrentProfile } from '../actions/profile';

const navToReg = () => {
  window.location.href = '../register';
};

const Portfolio = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  } else if (!loading && profile !== null) {
    return (
      <Paper className="portfolioContainer" elavation={4}>
        <Landing name={profile.user.name} label={profile.about.label} />
        <About summary={profile.about} />
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
          phone={profile.user.phone}
          location={profile.location}
        />
      </Paper>
    );
  } else if (!loading && profile === null) {
    return (
      <div className="noProf">
        No profile found
        <br />
        please make one by clicking
        {' '}
        <span onClick={navToReg}>here</span>
      </div>
    );
  }

  //return (<div>Hello</div>)
};

Portfolio.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Portfolio);
