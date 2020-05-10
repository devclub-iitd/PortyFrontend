import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';

// import MySnackbarContentWrapper from '../components/snackbar';

import LoginForm from '../components/loginForm';

import '../style/regLanding.css';

const styles = {
  rootRegNav: {
    flexGrow: 1,
    maxWidth: 400,
    marginTop: '40px',
  },
  button: {
    width: '200px',
    height: '55px',
    borderRadius: '10px',
    marginTop: '40px',
  },
  rootRegPage: {
    marginTop: '40px',
    opacity: '0.6',
    minWidth: '570px',
    width: '35%',
    height: 'auto',
    padding: '20px',
  },
};

class IconLabelTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDial: false,
      message: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.openDial = this.openDial.bind(this);
  }

  componentDidUpdate(oldProps) {
    let index = 0;
    // eslint-disable-next-line react/prop-types
    const { alerts } = this.props;
    // eslint-disable-next-line react/prop-types
    if (oldProps.alerts.length !== alerts.length) {
      // eslint-disable-next-line react/prop-types
      index = alerts.length - 1;
      // eslint-disable-next-line react/prop-types
      this.openDial(alerts[index].msg);
    }
  }

  handleClose() {
    this.setState({
      openDial: false,
    });
  }

  openDial(mess) {
    this.setState({
      openDial: true,
      message: mess,
    });
  }

  render() {
    const { classes } = this.props;
    const { openDial, message } = this.state;
    return (
      <div className="loginPageContainer" style={{ textAlign: 'center', marginTop: '0px' }}>
        <div className="pageOverlay">
          <div className="title">
            Account Login
          </div>
          <Paper className={classes.rootRegPage}>
            <LoginForm handleDial={this.openDial} />
          </Paper>
          <div className="lgnBtnCont">
            <Button variant="contained" color="secondary" className={classes.button} type="submit" form="loginform">
          Sign-In
            </Button>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={openDial}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={(
              <span
                id="message-id"
                style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                }}
              >
                <InfoIcon style={{ marginRight: '10px' }} />
                {message}
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
      </div>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(withStyles(styles)(IconLabelTabs));
