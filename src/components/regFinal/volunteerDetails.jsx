import React from 'react';

const VolunteerDetails = () => (
  <div>
    <input type="text" required placeholder="Organisation:" />
    <input type="text" required placeholder="Position:" />
    <input type="text" required placeholder="Website:" />
    <div className="row rowtwo">
      <input className="left" type="text" required placeholder="Start Date: DD/MM/YYYY" />
      <input className="right" type="text" required placeholder="End Date: DD/MM/YYYY or Ongoing" />
    </div>
    <textarea resize="none" placeholder="Summary | Highlights : " />
  </div>
);

export default VolunteerDetails;
