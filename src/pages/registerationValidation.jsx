import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import '../style/validation.css';

const useStyles = makeStyles(() => ({
    button: {
        width: '150px',
        height: '40px',
        marginTop: '30px',
        borderRadius: '5px',
    },
    input: {
        display: 'none',
    },
}));

const navtoLog = () => {
    window.location.href = '../';
};

const Validation = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
                <Toolbar>
                    <Typography>
                        <span style={{ fontWeight: 700, fontSize: '20px' }}>
                            Portfolio Creator
                        </span>{' '}
                        <span style={{ color: '#3d40d8' }}>| Verification</span>
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
                            Verification Successful :)
                        </Typography>
                        <Typography
                            style={{
                                marginTop: '30px',
                                fontSize: '18px',
                                fontWeight: '300',
                            }}
                        >
                            Your email has been verified successfully.
                            <br /> Kindly click the button below to proceed to
                            the login page <br />
                            <b>And Login with your newly created account.</b>
                        </Typography>
                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={navtoLog}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Validation;
