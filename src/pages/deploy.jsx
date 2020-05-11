import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import '../style/deploy.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: '200px',
    height: '50px',
    marginLeft: '20px',
    marginRight: '20px',
    borderRadius: '15px',
  },
  buttonSecondary: {
    width: '180px',
    margin: '20px auto',
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

const design1 = () => {
  window.location.href = './portfolio';
};

const design2 = () => {
  window.location.href = './portfolio2';
};

const navToTutorial = () => {
  window.location.href = 'https://youtu.be/BMEjPExaS_A';
};

const Deploy = () => {
  const classes = useStyles();
  return (
    <div className="fullScreenInside">
      <div>
        <Typography variant="h4" className={classes.bold}>
          To deploy your website -
        </Typography>
        <Typography className={classes.steps}>
          1) Create a github account
          <br />
          2) Create a new repository in your account with the name as
          username.github.io where username is your github username.
          <br />
          3) Click the Download button on the homepage to a download a file
          named - &quot;file.json&quot;
          <br />
          4) Choose a design template from below, download it and unzip it.
          <br />
          5) Place your file.json in the foldernamed &quot;data&quot; inside the
          unzipped content. If prompted, replace the existing file.
          <br />
          6) On your github repository, click &quot;add existing files&quot; and
          drag the entire content in the unzipped folder to the browser in order
          to upload them.
          <br />
          7) Click on done, and wait for the files to upload. In a couple of
          minutes your website should become live on the url -
          username.github.io
        </Typography>
      </div>
      <div className="buttonRow">
        <div className="buttonColumn">
          <a
            href="https://drive.google.com/open?id=136g5dZ4kcHDYm3BPJTDn7smO5Db6HZJ8"
            target="_blank"
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ textDecoration: 'none' }}
              className={classes.button}
            >
              Design 1
            </Button>
          </a>
          <br />
          <Button variant="outlined" onClick={design1}>
            View
          </Button>
        </div>
        <div className="buttonColumn">
          <a
            href="https://drive.google.com/open?id=1RfS3n0gFLTeA77AzyEVBMg7L9XrV6Lse"
            target="_blank"
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ textDecoration: 'none' }}
              className={classes.button}
            >
              Design 2
            </Button>
          </a>
          <br />
          <Button variant="outlined" onClick={design2}>
            View
          </Button>
        </div>
      </div>
      <Button
        variant="outlined"
        className={classes.buttonSecondary}
        onClick={navToTutorial}
      >
        Tutorial
      </Button>
    </div>
  );
};

export default Deploy;
