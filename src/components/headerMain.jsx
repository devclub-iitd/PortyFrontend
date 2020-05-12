import React from 'react';
import {
    MuiThemeProvider,
    createMuiTheme,
    withStyles,
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import Home from '../pages/home';
import Edit from '../pages/edit';
import Deploy from '../pages/deploy';
import { getCurrentProfile } from '../actions/profile';
import { logout } from '../actions/auth';

import Loader from './loader';

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
        justifyContent: 'space-around',
    },
});

class SimpleTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, loading, user } = this.props;
        const { value } = this.state;
        if (loading) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
        // if (loading === false) {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar
                        position="static"
                        className={classes.headercontainer}
                    >
                        <div className="headerDetails">
                            <div className="headerTitle">
                                <span
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '20px',
                                    }}
                                >
                                    Portfolio Creator
                                </span>{' '}
                                <span
                                    style={{
                                        color: '#3d40d8',
                                        fontSize: '16px',
                                    }}
                                >
                                    | {user.name}
                                </span>
                            </div>
                        </div>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            className={classes.navbarContainer}
                        >
                            <Tab className={classes.navbarItem} label="Home" />
                            <Tab className={classes.navbarItem} label="Edit" />
                            <Tab
                                className={classes.navbarItem}
                                label="Deploy"
                            />
                        </Tabs>
                    </AppBar>
                    {value === 0 && (
                        <TabContainer>
                            <Home />
                        </TabContainer>
                    )}
                    {value === 1 && (
                        <TabContainer>
                            <Edit />
                        </TabContainer>
                    )}
                    {value === 2 && (
                        <TabContainer>
                            <Deploy />
                        </TabContainer>
                    )}
                </div>
            </MuiThemeProvider>
        );
        // }
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    user: PropTypes.oneOfType([PropTypes.object]).isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(
    withStyles(styles)(SimpleTabs)
);
