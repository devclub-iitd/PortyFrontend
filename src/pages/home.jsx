import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Portfolio from '../components/portfolio';
import '../style/home.css';
import {connect} from 'react-redux'
import {logout} from '../actions/auth'
import {Link}  from 'react-router-dom'
import { createBrowserHistory } from "history";
import NavigationIcon from '@material-ui/icons/Navigation';

const history = createBrowserHistory();
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



const download = () => {
  alert('insert download portfolio waala code here');
};

const Home = ({logout , history }) => {
  const classes = useStyles();
  const portfolio = () => {
    
  };
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
          <Link to='/portfolio'>Portfolio</Link>
        </Fab>
        <Fab variant="extended" color="secondary" aria-label="delete" className={classes.fab} onClick={download}>
          <NavigationIcon className={classes.extendedIcon} />
          Download
        </Fab>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Home);
