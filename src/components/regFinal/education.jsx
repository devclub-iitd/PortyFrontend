import React from 'react';
import Paper from '@material-ui/core/Paper';
import EducationDetails from './educationDetails'

class Education extends React.Component{


  render(){
    return(
      <Paper className="locationContainer formContainer">
        <div className="formContainerTitle">Education</div>
        <div className="formContainerLineSeperator"></div>
        <div className="formContainerContent">
          <EducationDetails />
          <div className="addBtn">+</div>
        </div>
      </Paper>
    )
  }
}
export default Education;
