import React, { useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';

import Portfolio from '../components/portfolio';
import '../style/home.css';

import { getCurrentProfile } from '../actions/profile';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    marginRight: '10px',
    marginLeft: '10px',
    textDecoration: 'none',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  redBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c0392b',
    },
  },
}));


const download = () => {
  alert('insert download portfolio waala code here');
};

const Home = ({logout, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const classes = useStyles();
  const portfolio = () => {};

  return (
    <div>
      <div className="homePageTitle">Your Portfolio is ready...</div>
      <Portfolio />
      <div className="btnRowHome">
        <Fab variant="extended" color="primary" aria-label="delete" className={`${classes.fab} ${classes.redBtn}`} onClick={logout}>
          <NavigationIcon className={classes.extendedIcon} />
          Logout
        </Fab>
        <Link to="/portfolio">
          <Fab variant="extended" color="primary" aria-label="delete" className={classes.fab} onClick={portfolio}>
            <NavigationIcon className={classes.extendedIcon} />
            <div className="remDec">Portfolio</div>
          </Fab>
        </Link>
        <Fab variant="extended" color="secondary" aria-label="delete" className={classes.fab} onClick={download}>
          <NavigationIcon className={classes.extendedIcon} />
          Download
        </Fab>
      </div>
    </div>

  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout, getCurrentProfile },
)(Home);
