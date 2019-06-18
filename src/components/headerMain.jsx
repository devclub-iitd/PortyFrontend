import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Portfolio from './portfolio';
import '../style/header.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255,255,255,1)',
    },
    secondary: {
      main: '#8f3066',
    },
  },
});


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

const styles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#e6e6e6',
  },
  slider: {
    backgroundColor: 'blue',
  },
  navbarContainer: {
    height: '55px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    lineHeight: '55px',
  },
  navbarItem: {
    height: '55px',
    borderBottom: '2px solid #E88666',
    transition: '0.12s ease-out',
    '&:tabSelected': {
      letterSpacing: '2px',
      fontWeight: '600',
      color: '#e6e6e6',
    },
    '&:hover': {
      color: '#000',
      // fontWeight: '600',
      letterSpacing: '2px',
    },
  },
  headercontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" className={classes.headercontainer}>
            <div className="headerDetails">
              <div className="headerImage" />
              <div className="headerTitle"> User Name here </div>
            </div>
            <Tabs value={value} onChange={this.handleChange} className={classes.navbarContainer}>
              <Tab className={classes.navbarItem} label="Home" />
              <Tab className={classes.navbarItem} label="Edit" />
              <Tab className={classes.navbarItem} label="Add" />
              <Tab className={classes.navbarItem} label="Settings" />
            </Tabs>
          </AppBar>
          {value === 0 && (
          <TabContainer>
            <Portfolio />
            {' '}
          </TabContainer>
          )}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
          {value === 3 && <TabContainer>Item Three</TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
