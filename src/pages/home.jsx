import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Portfolio from '../components/portfolio';
import '../style/home.css';

import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const logout = () => {
  alert('insert logout waala code here');
};

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="homePageTitle">Your Portfolio is ready...</div>
      <Portfolio />
      <Fab variant="extended" aria-label="delete" className={classes.fab} onClick={logout}>
        <NavigationIcon className={classes.extendedIcon} />
        Extended
      </Fab>
    </div>

  )
}

export default Home;
