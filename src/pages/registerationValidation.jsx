import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import '../style/validation.css';

class Validation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ otp: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { otp } = this.state;
    return (
      <div>
        <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
          <Toolbar>
            <Typography>
              <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
              {' '}
              <span style={{ color: '#3d40d8' }}>| Account Validation</span>
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="validationTitleContainer">
          <div className="validationTitle">
            Please enter the otp recieved on the email address:
          </div>
          <div className="validationSubtitle">
            aryanguptaleo@gmail.com
          </div>
        </div>
        <Paper className="validationFormContainer">
          <form onSubmit={this.handleSubmit}>
            <input type="number" value={otp} onChange={this.handleChange} required className="validationOtp" placeholder="OTP:" />
            <Button variant="contained" color="secondary" type="submit">
              Continue
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Validation;
