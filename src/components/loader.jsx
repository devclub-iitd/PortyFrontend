import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className="loadingIcon">
            <CircularProgress className={classes.progress} color="secondary" />
        </div>
    );
};

export default withStyles(useStyles)(Loader);
