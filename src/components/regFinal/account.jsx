import React from 'react';
import Paper from '@material-ui/core/Paper';

class Account extends React.Component{
  render(){
    return(
      <Paper className="aboutContainer formContainer">
        <div className="formContainerTitle">Account <span className="formContainerTitleDesc">| Help us setup your account</span></div>
        <div className="formContainerLineSeperator"></div>
        <div className="formContainerContent">
          <form>
            <div className="row rowtwo">
              <input className="left"type="text" required placeholder="Password: "></input>
              <input className="right"type="text" required placeholder="Confirm Passworld: "></input>
            </div>
            <input type="text" required placeholder="Password Hint: To help you remember incase you forget"></input>
          </form>
        </div>
      </Paper>
    )
  }
}
export default Account;
