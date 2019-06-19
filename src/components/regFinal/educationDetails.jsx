import React from 'react';


const EducationDetails = () => (
  <form>
    <input type="text" required placeholder="Institution:"></input>
    <div className="row rowtwo">
    <input className="left"type="text" required placeholder="Area: Software Development"></input>
    <input className="right"type="text" required placeholder="Qualification: Bachelors | Masters | etc"></input>
    </div>
    <div className="row rowtwo">
      <input className="left"type="text" required placeholder="Start Date: DD/MM/YYYY"></input>
      <input className="right"type="text" required placeholder="End Date: DD/MM/YYYY or Ongoing"></input>
    </div>
    <input type="text" required placeholder="GPA: xx/10"></input>
    <textarea resize="none" placeholder="Details | Courses : "></textarea>
  </form>
);

export default EducationDetails;
