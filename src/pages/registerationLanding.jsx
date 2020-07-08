import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

import RegForm from '../components/landingRegForm';
import Confirmation from '../components/confirmation';

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
        minHeight: '240px', // 328px
        paddingBottom: '30px',
        backgroundColor: 'rgba(230, 230, 230, 0.8)',
        opacity: 0.8,
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

class IconLabelTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            openDial: false,
            message: '',
            openConfirmation: false,
            confirmationText: '',
        };
        this.handleClose = this.handleClose.bind(this);
        this.openDial = this.openDial.bind(this);
        this.openTemp = this.openTemp.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    componentDidUpdate(oldProps) {
        let index = 0;
        const { alerts } = this.props;
        if (oldProps.alerts.length !== alerts.length) {
            index = alerts.length - 1;
            this.handleConfirmation(true, alerts[index].msg);
            // this.openDial(alerts[index].msg);
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

    handleConfirmation(val, text) {
        this.setState({
            openConfirmation: val,
            confirmationText: text,
        });
    }

    render() {
        const { classes } = this.props;
        const {
            value,
            openDial,
            message,
            openConfirmation,
            confirmationText,
        } = this.state;
        let confirmation;
        if (openConfirmation) {
            confirmation = (
                <Confirmation
                    title="Note"
                    text={confirmationText}
                    handleClose={this.handleConfirmation}
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
                        <div className="title">Register</div>
                        {value === 0 && (
                            <TabContainer>
                                {' '}
                                <RegForm
                                    handleDial={this.openDial}
                                    handleAlert={this.handleConfirmation}
                                />{' '}
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
    alerts: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(withStyles(styles)(IconLabelTabs));
