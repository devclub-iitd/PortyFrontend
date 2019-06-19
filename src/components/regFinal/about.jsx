import React from 'react';
import Paper from '@material-ui/core/Paper';


class About extends React.Component{
  render(){
    return(
      <Paper className="aboutContainer formContainer">
        <div className="formContainerTitle">About You <span className="formContainerTitleDesc">| Tell us a bit more about yourself</span></div>
        <div className="formContainerLineSeperator"></div>
        <div className="formContainerContent">
          <form>
            <input type="text" required placeholder="Label: Student"></input>
            <textarea resize="none" placeholder="A brief summary about you ..."></textarea>
          </form>
        </div>
      </Paper>
    )
  }
}
export default About;
