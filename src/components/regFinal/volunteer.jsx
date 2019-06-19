import React from 'react';
import Paper from '@material-ui/core/Paper';
import VolunteerDetails from './volunteerDetails'

class Volunteer extends React.Component{


  render(){
    return(
      <Paper className="locationContainer formContainer">
        <div className="formContainerTitle">Volunteer</div>
        <div className="formContainerLineSeperator"></div>
        <div className="formContainerContent">
          <VolunteerDetails />
          <div className="addBtn">+</div>
        </div>
      </Paper>
    )
  }
}
export default Volunteer;
