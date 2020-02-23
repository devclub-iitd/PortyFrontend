import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    width: '150px',
    height: '40px',
    marginTop: '30px',
    borderRadius: '5px',
  },
  input: {
    display: 'none',
  },
};

class ResetSucc extends React.Component {

  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    window.location.href = '../';
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <Typography>
              <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
              {' '}
              <span style={{ color: '#3d40d8' }}>| Reset Successful</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="fullScreen">
          <div className="overlay">
            <div className="notFoundTextContainer">
              <Typography variant="h3" style={{ marginTop: '0px', fontWeight: '600' }}>
                Your Password has been changed Successfully
              </Typography>
              <Typography style={{ marginTop: '25px', fontSize: '18px', fontWeight: '300' }}>
                Kindly login with your newly created password
              </Typography>
            </div>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleRedirect}>
              Login
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ResetSucc);
