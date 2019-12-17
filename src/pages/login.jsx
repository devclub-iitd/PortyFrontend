import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';

import MySnackbarContentWrapper from '../components/snackbar';

import LoginForm from '../components/loginForm';

import '../style/regLanding.css';

const styles = {
  rootRegNav: {
    flexGrow: 1,
    maxWidth: 400,
    margin: 'auto',
    marginTop: '40px',
  },
  button: {
    width: '200px',
    height: '55px',
    marginTop: '33px',
    textAlign: 'center',
    borderRadius: '10px',
  },
  rootRegPage: {
    margin: 'auto',
    marginTop: '40px',
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

  componentDidUpdate(oldProps) {
    let index = 0;
    if (oldProps.alerts.length !== this.props.alerts.length ) {
      index = this.props.alerts.length - 1;
      this.openDial(this.props.alerts[index].msg);
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <div className="loginPageContainer" style={{ textAlign: 'center', marginTop: '100px' }}>
        <div className="title">
            Login
        </div>
        <Paper className={classes.rootRegPage}>
          <LoginForm handleDial={this.openDial} />
        </Paper>
        <Button variant="contained" color="secondary" className={classes.button} type="submit" form="loginform">
          Login
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openDial}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
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
