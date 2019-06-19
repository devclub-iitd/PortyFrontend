import React from 'react';
import Paper from '@material-ui/core/Paper';
import WorkDetails from './workDetails'

class Work extends React.Component{


  render(){
    return(
      <Paper className="locationContainer formContainer">
      <div className="formContainerTitle">Work <span className="formContainerTitleDesc">| Insert relevant caption here</span></div>
        <div className="formContainerLineSeperator"></div>
        <div className="formContainerContent">
          <WorkDetails />
          <div className="addBtn">+</div>
        </div>
      </Paper>
    )
  }
}
export default Work;
