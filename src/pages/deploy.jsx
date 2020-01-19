import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import '../style/deploy.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '200px',
    height: '50px',
    marginLeft: '20px',
    marginRight: '20px',
    borderRadius: '15px',
  },
  steps: {
    fontSize: '18px',
    paddingLeft: '20px',
    lineHeight: '34px',
    marginTop: '14px',
  },
  bold: {
    fontWeight: 600,
  },
  input: {
    display: 'none',
  },
}));



const Deploy = () => {
  const classes = useStyles();
  return (
      <div className="fullScreen">
        <div>
          <Typography variant="h4" className={classes.bold}>
              To deploy your website -
          </Typography>
          <Typography className={classes.steps}>
            1) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus mattis augu
            et egestas ex facilisis eget.
            <br />
            2) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus mattis augu
            et egestas ex facilisis eget. Aliquam dolor nibh, gravida vel tellus vita
            maximus rutrum enim.
            <br />
            3) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus mattis augu
            et egestas ex facilisis eget.
            <br />
            4) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus mattis augu
            et egestas ex facilisis eget. Aliquam dolor nibh, gravida vel tellus vita
            maximus rutrum enim.
            <br />
            5) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus mattis augu
            et egestas ex facilisis eget.
          </Typography>
        </div>
        <div className="buttonRow">
          <Button variant="contained" color="secondary" className={classes.button}>
            Design 1
          </Button>
          <Button variant="contained" color="secondary" className={classes.button}>
            Design 2
          </Button>
          <Button variant="contained" color="secondary" className={classes.button}>
            Design 3
          </Button>
          <Button variant="contained" color="secondary" className={classes.button}>
            Design 4
          </Button>
        </div>
      </div>
  );
};

export default Deploy;
