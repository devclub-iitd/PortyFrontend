import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Portfolio from '../components/portfolio';
import '../style/home.css';

import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    marginRight: '10px',
    marginLeft: '10px',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  redBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c0392b',
    }
  }
}));

const logout = () => {
  alert('insert logout waala code here');
};
const portfolio = () => {
  alert('insert portfolio fullscreen waala code here');
};
const download = () => {
  alert('insert download portfolio waala code here');
};

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="homePageTitle">Your Portfolio is ready...</div>
      <Portfolio />
      <div className="btnRow">
        <Fab variant="extended" color="primary" aria-label="delete" className={`${classes.fab} ${classes.redBtn}`} onClick={logout}>
          <NavigationIcon className={classes.extendedIcon} />
          Logout
        </Fab>
        <Fab variant="extended" color="primary" aria-label="delete" className={classes.fab} onClick={portfolio}>
          <NavigationIcon className={classes.extendedIcon} />
          Portfolio
        </Fab>
        <Fab variant="extended" color="secondary" aria-label="delete" className={classes.fab} onClick={download}>
          <NavigationIcon className={classes.extendedIcon} />
          Download
        </Fab>
      </div>
    </div>

  )
}

export default Home;
