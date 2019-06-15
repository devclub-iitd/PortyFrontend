import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import PersonPinIcon from '@material-ui/icons/PersonPin';

import { BrowserRouter as Router } from 'react-router-dom';
import About from '../components/reg/about';


import '../style/reg.css';


// <Tab icon={<SchoolIcon/>} label="EDUCATION" />
// <Tab icon={<AchIcon />} label="ACHIEVEMENTS" />
// <Tab icon={<SettingsIcon />} label="LOGIN DETAILS" />

const styles = {
  rootRegNav: {
    flexGrow: 1,
    maxWidth: 670,
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
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


class IconLabelTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      subVal: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    alert('you are submitting');
    event.preventDefault();
  }

  btnClick = () => {
    this.setState({
      subVal: 1,
    });
    this.subbtn.click();
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div>
          <div className="title">
            Register
          </div>
          <Paper className={classes.rootRegPage}>
            {this.state.value === 0 && (
            <TabContainer>
              {' '}
              <About submit={this.handleSubmit} />
              {' '}
            </TabContainer>
            )}
          </Paper>

          <Paper square className={classes.rootRegNav}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab icon={<PersonPinIcon />} label="ABOUT YOU" />
            </Tabs>
          </Paper>
          <button form="regform" className="btn"> Let's Go </button>
        </div>
      </Router>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);
