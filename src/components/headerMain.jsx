import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Home from '../pages/home';
import Edit from '../pages/edit';
import '../style/header.css';

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
  },
  navbarContainer: {
    height: '55px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    lineHeight: '55px',
    position: 'fixed',
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
      letterSpacing: '2px',
    },
  },
  headercontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
          <AppBar position="fixed" className={classes.headercontainer}>
            <div className="headerTitle">
              Portfolio Creator
              {' '}
              <span>| Aryan Gupta</span>
            </div>
            <Tabs value={value} onChange={this.handleChange} className={classes.navbarContainer}>
              <Tab className={classes.navbarItem} label="Home" />
              <Tab className={classes.navbarItem} label="Edit" />
            </Tabs>
          </AppBar>
          {value === 0 && (
          <TabContainer>
            <Home />
            {' '}
          </TabContainer>
          )}
          {value === 1 && <TabContainer><Edit /></TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SimpleTabs);
