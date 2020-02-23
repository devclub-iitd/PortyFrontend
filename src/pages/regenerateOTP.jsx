import React, { useEffect, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import {regenerate_otp} from '../actions/auth'
import { connect } from 'react-redux';

import '../style/validation.css';
import { withRouter } from 'react-router-dom';

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

class Regenerate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      mess: ''
    }
    this.openDial = this.openDial.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    this.props.regenerate_otp(email);
  };

  handleClose() {
    this.setState({
      open: false
    })
  }
  openDial(mess) {
    this.setState({
      open: false
    })
    this.setState({
      open: true,
      mess: mess
    })
  }

  componentDidUpdate(oldProps) {
    let index = 0;
    if (oldProps.alert.length !== this.props.alert.length ) {
      index = this.props.alert.length - 1;
      this.openDial(this.props.alert[index].msg);
    }
  }

  render() {
    const { classes } = this.props;
    const { open, mess } = this.state;
    return(
      <div>
        <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <Typography>
              <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
              {' '}
              <span style={{ color: '#3d40d8' }}>| OTP</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="fullScreen">
          <div className="overlay">
            <div className="notFoundTextContainer">
              <Typography variant="h3" style={{ marginTop: '0px', fontWeight: '600' }}>
                Regenerate OTP -
              </Typography>
              <Typography style={{ marginTop: '25px', fontSize: '18px', fontWeight: '300' }}>
                <form id="regenerateForm" name="regenerateForm" onSubmit={this.handleSubmit}>
                  <input required type="email" name="email" placeholder="Email Adress: " />
                </form>
              </Typography>
            </div>
            <Button variant="contained" type="submit" color="secondary" className={classes.button} form="regenerateForm">
              Generate
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <span id="message-id" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <InfoIcon style={{ marginRight: '10px' }} />
              {mess}
            </span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  };
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  {regenerate_otp}
)(withStyles(styles)(withRouter(Regenerate)));
