import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Portfolio from './pfolio.js'
import '../style/headerLogin.css'
import Register from '../pages/register.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary:{
      main: 'rgba(255,255,255,1)',
    },
    secondary:{
      main: '#3d40d8',
    }
  }
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#e6e6e6',
  },
  slider:{
    backgroundColor:'blue'
  },
  navbarContainer:{
    height: '55px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    lineHeight:'55px',
  },
  navbarItem:{
    height: '55px',
    transition: '0.12s ease-out',
    '&:tabSelected':{
      letterSpacing:'2px',
      fontWeight: '600',
      color:'#e6e6e6'
    },
    '&:hover':{
      color: '#000',
      // fontWeight: '600',
      letterSpacing:'2px'
    }
  },
  headercontainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  }

});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  current = () => {
  const { location } = this.props;
  const currentPath = location.pathname;
  switch (currentPath) {
    case '/login': return 0;
    case '/register': return 1;
    default: return 0;
  }
}

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <MuiThemeProvider theme = {theme}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.headercontainer}>
          <div className = "headerDetails">
            <div className = "headerTitle"> Portfolio Creator </div>
          </div>
          <Tabs value={value || this.current()} onChange={this.handleChange} className={classes.navbarContainer}>
            <Tab className = {classes.navbarItem} label="Login"/>
            <Tab className = {classes.navbarItem} label="Register"/>
          </Tabs>
        </AppBar>
        {this.state.value === 1 && <TabContainer>Page One</TabContainer>}
        {this.state.value === 0 && <TabContainer><Register/></TabContainer>}
      </div>
      </MuiThemeProvider>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SimpleTabs));
