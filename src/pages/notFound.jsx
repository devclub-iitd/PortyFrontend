import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import '../style/notFound.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '200px',
    height: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    borderRadius: '25px',
  },
  input: {
    display: 'none',
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography>
            <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
            {' '}
            <span style={{ color: '#3d40d8' }}>| Error 404</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="fullScreen">
        <div className="notFoundTextContainer">
          <Typography variant="h2">
            : (
          </Typography>
          <Typography variant="h3" style={{ marginTop: '50px' }}>
            Whoops!!
          </Typography>
          <Typography variant="h5" style={{ marginTop: '20px' }}>
            The page you are looking for is not available.
          </Typography>
        </div>
        <Button variant="contained" color="secondary" className={classes.button}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
