import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

import LoginForm from '../components/loginForm';
import Confirmation from '../components/confirmation';

import '../style/regLanding.css';

const styles = {
    rootRegNav: {
        flexGrow: 1,
        maxWidth: 400,
        marginTop: '40px',
    },
    button: {
        width: '324px',
        height: '55px',
        borderRadius: '10px',
        marginTop: '20px',
    },
    rootRegPage: {
        backgroundColor: 'rgba(230, 230, 230, 0.6)',
        padding: '20px 50px 40px 50px',
        borderRadius: '10px',
    },
};

function navToResPass() {
    window.location.href = './reset';
}
class IconLabelTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDial: false,
            message: '',
            openConfirmation: false,
            verify: false,
            userEmail: '',
        };
        this.handleClose = this.handleClose.bind(this);
        this.setUserEmail = this.setUserEmail.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.openDial = this.openDial.bind(this);
    }

    componentDidUpdate(oldProps) {
        let index = 0;
        const { alerts } = this.props;
        if (oldProps.alerts.length !== alerts.length) {
            index = alerts.length - 1;
            if (
                alerts[index].msg.localeCompare(
                    'Your account has not been verified, Please check your email for verification'
                ) === 0
            ) {
                this.handleConfirmation(true, alerts[index].msg, true);
            } else {
                this.handleConfirmation(true, alerts[index].msg);
            }
            // this.openDial(alerts[index].msg);
        }
    }

    setUserEmail(mail) {
        this.setState({
            userEmail: mail,
        });
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

    handleConfirmation(val, message, verify = false) {
        this.setState({
            openConfirmation: val,
            message,
            verify,
        });
    }

    render() {
        const { classes } = this.props;
        const {
            openDial,
            message,
            openConfirmation,
            verify,
            userEmail,
        } = this.state;
        let confirmation;
        if (openConfirmation) {
            confirmation = (
                <Confirmation
                    title="Note"
                    text={message}
                    handleClose={this.handleConfirmation}
                    login={verify}
                    userEmail={userEmail}
                />
            );
        }

        return (
            <div
                className="loginPageContainer"
                style={{ textAlign: 'center', marginTop: '0px' }}
            >
                <div className="pageOverlay">
                    <Paper className={classes.rootRegPage}>
                        <div className="title">Portfolio Creator</div>
                        <br />
                        <LoginForm
                            openSnack={this.openDial}
                            handleEmail={this.setUserEmail}
                        />
                        <div className="lgnBtnCont">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                type="submit"
                                form="loginform"
                            >
                                Sign-In
                            </Button>
                            <div className="secBtnCont">
                                <Button
                                    variant="outlined"
                                    color="black"
                                    onClick={navToResPass}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </div>
                    </Paper>
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
                <AnimatePresence>{confirmation}</AnimatePresence>
            </div>
        );
    }
}

IconLabelTabs.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alerts: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(withStyles(styles)(IconLabelTabs));
