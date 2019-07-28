import React,{ useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Landing from './portfolio/landing';
import About from './portfolio/about';
import Education from './portfolio/education';
import Work from './portfolio/work';
import Volunteer from './portfolio/volunteer';
import Extra from './portfolio/extra';
import Contact from './portfolio/contact';

import '../style/portfolio.css';

import { getCurrentProfile } from '../actions/profile'





const Portfolio = ({ getCurrentProfile , auth , profile }) => {
  useEffect(() => {
    getCurrentProfile();
    console.log(auth);
    console.log(profile);
  },[])

   return (
    <div>hello</div>
  )
}

  
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






// render() {
//   const {
//     name,
//     label,
//     email,
//     phone,
//     about,
//     location,
//     education,
//     work,
//     volunteer,
//     awards,
//     publications,
//     skills,
//     languages,
//   } = this.state;

{/* <Paper className="portfolioContainer" elavation={4}>
      <Landing name={profile.user.name} label={profile.label} />
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
    </Paper> */}