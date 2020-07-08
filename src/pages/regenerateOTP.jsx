import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import { regenerateOtp } from '../actions/auth';

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

class Regenerate extends React.Component {
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

        const { regenerateOtp: regenerateOtp_ } = this.props;
        regenerateOtp_(email);
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
                                | Verification Link
                            </span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="fullScreen">
                    <div className="overlay">
                        <div className="notFoundTextContainer">
                            <Typography
                                variant="h4"
                                style={{ marginTop: '0px', fontWeight: '600' }}
                            >
                                Regenerate Verification Link -
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
                                        placeholder="Email Address: "
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
                            Generate
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

Regenerate.propTypes = {
    regenerateOtp: PropTypes.func.isRequired,
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    alert: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    alert: state.alert,
});

export default connect(mapStateToProps, { regenerateOtp })(
    withStyles(styles)(withRouter(Regenerate))
);
