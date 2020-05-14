import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPass } from '../actions/auth';

import '../style/validation.css';

const styles = {
    button: {
        width: '150px',
        height: '40px',
        marginTop: '30px',
        borderRadius: '5px',
    },
    input: {
        display: 'none',
    },
};

class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mess: '',
        };
        this.openDial = this.openDial.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(oldProps) {
        let index = 0;
        const { alert } = this.props;
        if (oldProps.alert.length !== alert.length) {
            index = alert.length - 1;
            this.openDial(alert[index].msg);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const { resetPass: resetPass_ } = this.props;
        resetPass_({ email, password });
        // insert the bloody function here
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    openDial(mess) {
        this.setState({
            open: false,
        });
        this.setState({
            open: true,
            mess,
        });
    }

    render() {
        const { classes } = this.props;
        const { open, mess } = this.state;
        return (
            <div>
                <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
                    <Toolbar>
                        <Typography>
                            <span style={{ fontWeight: 700, fontSize: '20px' }}>
                                Portfolio Creator
                            </span>{' '}
                            <span style={{ color: '#3d40d8' }}>
                                | Password Reset
                            </span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="fullScreen">
                    <div className="overlay">
                        <div className="notFoundTextContainer">
                            <Typography
                                variant="h3"
                                style={{ marginTop: '0px', fontWeight: '600' }}
                            >
                                Reset Password -
                            </Typography>
                            <Typography
                                style={{
                                    marginTop: '25px',
                                    fontSize: '18px',
                                    fontWeight: '300',
                                }}
                            >
                                <form
                                    id="regenerateForm"
                                    name="regenerateForm"
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email Adress: "
                                    />
                                    <br />
                                    <br />
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        placeholder="Enter New Password: "
                                    />
                                </form>
                            </Typography>
                        </div>
                        <Button
                            variant="contained"
                            type="submit"
                            color="secondary"
                            className={classes.button}
                            form="regenerateForm"
                        >
                            Reset
                        </Button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
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
                            {mess}
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
        );
    }
}

const mapStateToProps = (state) => ({
    alert: state.alert,
});

Reset.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alert: PropTypes.oneOfType([PropTypes.object]).isRequired,
    resetPass: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { resetPass })(
    withStyles(styles)(withRouter(Reset))
);
