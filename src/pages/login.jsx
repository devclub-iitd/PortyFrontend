import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import loginForm from '../components/loginForm';

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
    minHeight: '240px', // 328px
    paddingBottom: '30px',
  },
};

class IconLabelTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="title">
            Login
        </div>
        <Paper className={classes.rootRegPage}>
          <loginForm />
        </Paper>
        <button form="loginform" className="btn" type="submit"> Login </button>
      </div>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(IconLabelTabs);
