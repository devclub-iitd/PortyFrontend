import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import '../style/header.css';
import Register from '../pages/registerationLanding';
import Login from '../pages/login';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255,255,255,1)',
    },
    secondary: {
      main: '#3d40d8',
    },
  },
});


function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(5px)',
    zIndex: '10',
    position: 'fixed',
    justifyContent: 'space-around',
  },
  tcalign: {
    backgroundColor: 'red',
  },

});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static" className={classes.headercontainer}>
            <div className="headerDetails">
              <div className="headerTitle" style={{ fontWeight: '600', fontSize: '20px' }}>Portfolio Creator</div>
            </div>
            <Tabs value={value} onChange={this.handleChange} className={classes.navbarContainer}>
              <Tab className={classes.navbarItem} label="Login" />
              <Tab className={classes.navbarItem} label="Register" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer className={classes.tcalign}><Login /></TabContainer>}
          {value === 1 && <TabContainer><Register /></TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SimpleTabs);
