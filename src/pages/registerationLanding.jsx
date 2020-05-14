import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

import { connect } from 'react-redux';

import RegForm from '../components/landingRegForm';

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
        marginTop: '40px',
        textAlign: 'center',
        borderRadius: '10px',
    },
    rootRegPage: {
        marginTop: '40px',
        minWidth: '570px',
        textAlign: 'left',
        width: '65%',
        opacity: '0.6',
        minHeight: '240px', // 328px
        paddingBottom: '30px',
    },
};

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

function navToRegOTP() {
    window.location.href = './regenerate';
}

function navToResPass() {
    window.location.href = './reset';
}

class IconLabelTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            openDial: false,
            message: '',
        };
        this.handleClose = this.handleClose.bind(this);
        this.openDial = this.openDial.bind(this);
        this.openTemp = this.openTemp.bind(this);
        this.navToRegOTP = navToRegOTP.bind(this);
        this.navToResPass = navToResPass.bind(this);
    }

    componentDidUpdate(oldProps) {
        let index = 0;
        const { alerts } = this.props;
        if (oldProps.alerts.length !== alerts.length) {
            index = alerts.length - 1;
            this.openDial(alerts[index].msg);
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClose() {
        this.setState({
            openDial: false,
        });
    }

    openTemp() {
        this.setState({
            openDial: true,
            message:
                'Please wait while we register your profile. Do not click away.',
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
        const { value, openDial, message } = this.state;

        return (
            <div
                className="loginPageContainer"
                style={{ textAlign: 'center', marginTop: '0px' }}
            >
                <div className="pageOverlay">
                    <div className="title">Register</div>
                    <Paper className={classes.rootRegPage}>
                        {value === 0 && (
                            <TabContainer>
                                {' '}
                                <RegForm handleDial={this.openDial} />{' '}
                            </TabContainer>
                        )}
                    </Paper>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        type="submit"
                        form="regform"
                        onSubmit={this.openTemp}
                    >
                        Let&apos;s Go
                    </Button>
                    <div className="secBtnCont">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={navToRegOTP}
                        >
                            Regenerate OTP
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={navToResPass}
                        >
                            Reset Password
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
                        message={
                            <span
                                id="message-id"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <InfoIcon style={{ marginRight: '10px' }} />
                                {message}
                            </span>
                        }
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
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alerts: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(withStyles(styles)(IconLabelTabs));
