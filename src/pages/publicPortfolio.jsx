import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from '../components/portfolio/landing';
import About from '../components/portfolio/about';
import Education from '../components/portfolio/education';
import Work from '../components/portfolio/work';
import Volunteer from '../components/portfolio/volunteer';
import Extra from '../components/portfolio/extra';
import Contact from '../components/portfolio/contact';
import { withRouter } from 'react-router';

import Loader from '../components/loader';

import '../style/portfolio.css';

import { getPublicProfile } from '../actions/profile';

const scrollToRef = ref => alert('insert scroll page function');
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const Portfolio = ({
    match,
    getPublicProfile,
    profile : {loading , profile}
}) => {
  useEffect(() => {
    getPublicProfile(match.params.id);
  }, []);
  const myRef = React.useRef(null);
  const initScroll = () => scrollToRef(myRef);
  // const { offsetTop } = myRef.current.offsetTop;

  if (loading) {
    return <div><Loader /></div> ;
  }

  if (!loading && profile !== null) {
    return (
      <div class="portfolioContainerFull">
        <Landing
          name={profile.user.name}
          label={profile.about.label}
          initScroll={initScroll}
        />
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
      </div>
    );
  }

  if (!loading && profile === null) {
    return <div>No profile found...User Hasnt created his/her profile yet.</div>;
  }
};

Portfolio.propTypes = {
  getPublicProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getPublicProfile }
)(withRouter(Portfolio));
