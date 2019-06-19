import React from 'react';
import Paper from '@material-ui/core/Paper';


class Location extends React.Component{


  render(){
    return(
      <Paper className="locationContainer formContainer">
        <div className="formContainerTitle">Location</div>
        <div className="formContainerLineSeperator"></div>
        <div className="formContainerContent">
          <form>
            <input type="text" required placeholder="Address Line 1:"></input>
            <input type="text" required placeholder="Address Line 2:"></input>
            <div className="row">
              <input className="rowInputThree" type="text" required placeholder="City | State :"></input>
              <input className="rowInputThree" type="text" required placeholder="Pincode:"></input>
              <input className="rowInputThree" type="text" required placeholder="Country:"></input>
            </div>
          </form>
        </div>
      </Paper>
    )
  }
}
export default Location;
