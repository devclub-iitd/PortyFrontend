import React,{ useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from '../components/portfolio/landing';
import About from '../components/portfolio/about';
import Education from '../components/portfolio/education';
import Work from '../components/portfolio/work';
import Volunteer from '../components/portfolio/volunteer';
import Extra from '../components/portfolio/extra';
import Contact from '../components/portfolio/contact';

import '../style/portfolio.css';

import { getCurrentProfile } from '../actions/profile';

const scrollToRef = (ref) => alert("insert scroll page function");
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const Portfolio = ({ getCurrentProfile , auth , profile : {profile , loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  },[])
  const myRef = React.useRef(null);
  const initScroll = () => scrollToRef(myRef);
  // const { offsetTop } = myRef.current.offsetTop;
  return loading && profile === null ? (<div>loading</div>) : (
    <div class="portfolioContainerFull">
      <Landing name={profile.user.name} label={profile.label} initScroll={initScroll} />
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
        phone={profile.phone}
        location={profile.location}
      />
    </div>
  );
};


Portfolio.propTypes = {
  getCurrentProfile : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired
}



const mapStateToProps = state => ({
  auth : state.auth,
  profile : state.profile
})

export default connect(mapStateToProps , {getCurrentProfile})(Portfolio);
