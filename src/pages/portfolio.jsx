import React, { useEffect } from 'react';
// import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import { Redirect } from 'react-router-dom';
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

import { getCurrentProfile } from '../actions/profile';

const useStyles = makeStyles(() => ({
  button: {
    width: '150px',
    height: '40px',
    marginTop: '30px',
    borderRadius: '5px',
  },
}));


const scrollToRef = ref => alert('insert scroll page function');
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
const navToReg = () => {
  window.location.href = '../register';
};
const Portfolio = ({
  getCurrentProfile,
  isAuthenticated,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const classes = useStyles();
  const myRef = React.useRef(null);
  const initScroll = () => scrollToRef(myRef);
  // const { offsetTop } = myRef.current.offsetTop;

  if (loading) {
    return <div><Loader /></div>;
  }

  if (!loading && profile !== null && !auth.loading && auth.isAuthenticated) {
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

  if (!loading && profile === null && !auth.loading && auth.isAuthenticated) {
    return (
      <div>
        <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <Typography>
              <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
              {' '}
              <span style={{ color: '#3d40d8' }}>| Whoops :(</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="noProf noProfLarge">
          No profile found
          {' '}
          ...
          <br />
          <Button variant="contained" color="secondary" className={classes.button} onClick={navToReg}>
            Create
          </Button>
        </div>
      </div>
    );
  }

  if (!loading && !isAuthenticated && !auth.loading) {
    return <div>u  need to be logged in to access this.please login</div>;
  }

  return <div>hello world</div>;
};

Portfolio.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Portfolio);
