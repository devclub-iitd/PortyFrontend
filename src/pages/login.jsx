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
        maxWidth: '450px',
    },
    rootRegPageSubTitle: {
        color: 'rgba(0, 0, 0 , 0.5)',
        fontSize: '14px',
    },
};

const navToCasi = () => {
    // window.location.href =
    // 'http://localhost:8000/user/login?serviceURL=http://localhost:3000/home';
    window.location.href =
        'https://auth.devclub.in?serviceURL=https://portfolio.devclub.in';
};

class IconLabelTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDial: false,
            message: '',
            openConfirmation: false,
            verify: false,
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.openDial = this.openDial.bind(this);
    }

    componentDidUpdate(oldProps) {
        let index = 0;
        const { alerts } = this.props;
        if (oldProps.alerts.length !== alerts.length) {
            index = alerts.length - 1;
            this.handleConfirmation(true, alerts[index].msg);
        }
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
        const { openDial, message, openConfirmation, verify } = this.state;
        let confirmation;
        if (openConfirmation) {
            confirmation = (
                <Confirmation
                    title="Note"
                    text={message}
                    handleClose={this.handleConfirmation}
                    login={verify}
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
                        <div className="lgnBtnCont">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={navToCasi}
                            >
                                Continue with devclub casi
                            </Button>
                        </div>
                        <br />
                        <div className={classes.rootRegPageSubTitle}>
                            <i>
                                The perfect tool to create your very own
                                personal portfolio website and deploy it
                                instantly.
                            </i>
                        </div>
                    </Paper>
                    <br />
                    <div style={{ padding: '20px', fontSize: '14px' }}>
                        <i>
                            To get started, simply click on the button to create
                            or sign in to your common account and enjoy all
                            services provided by <b>Devclub IIT Delhi.</b>
                        </i>
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
