import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';


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

const Regenerate = () => {
  const [open, setOpen] = React.useState(false);
  const [mess, setMess] = React.useState('');
  const classes = useStyles();
  var message = '';
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    setMess('Kindly check your email for an updated OTP link');
    setOpen(true);
  };

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };


  return (
    <div>
      <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography>
            <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
            {' '}
            <span style={{ color: '#3d40d8' }}>| OTP</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="fullScreen">
        <div className="overlay">
          <div className="notFoundTextContainer">
            <Typography variant="h3" style={{ marginTop: '0px', fontWeight: '600' }}>
              Regenerate OTP -
            </Typography>
            <Typography style={{ marginTop: '25px', fontSize: '18px', fontWeight: '300' }}>
              <form id="regenerateForm" name="regenerateForm" onSubmit={handleSubmit}>
                <input required type="email" name="email" placeholder="Email Adress: " />
              </form>
            </Typography>
          </div>
          <Button variant="contained" type="submit" color="secondary" className={classes.button} form="regenerateForm">
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
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={(
          <span id="message-id" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <InfoIcon style={{ marginRight: '10px' }} />
            {mess}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
};

export default Regenerate;
