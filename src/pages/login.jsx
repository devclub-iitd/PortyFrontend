import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
  rootRegPage: {
    margin: 'auto',
    marginTop: '40px',
    minWidth: '570px',
    width: '65%',
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

  render() {
    const { classes } = this.props;

    return (
      <div className="loginPageContainer">
        <div className="title">
            Login
        </div>
        <Paper className={classes.rootRegPage}>
          <LoginForm handleDial={this.openDial} />
        </Paper>
        <button form="loginform" className="btn" type="submit"> Login </button>
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

export default withStyles(styles)(IconLabelTabs);
