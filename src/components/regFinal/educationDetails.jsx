import React from 'react';

const EducationDetails = () => (
  <div>
    <input type="text" required placeholder="Institution:" />
    <div className="row rowtwo">
      <input className="left" type="text" required placeholder="Area: Software Development" />
      <input className="right" type="text" required placeholder="Qualification: Bachelors | Masters | etc" />
    </div>
    <div className="row rowtwo">
      <input className="left" type="text" required placeholder="Start Date: DD/MM/YYYY" />
      <input className="right" type="text" required placeholder="End Date: DD/MM/YYYY or Ongoing" />
    </div>
    <input type="text" required placeholder="GPA: xx/10" />
    <textarea resize="none" placeholder="Details | Courses : " />
  </div>
);

export default EducationDetails;
