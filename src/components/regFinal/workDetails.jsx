import React from 'react';

const WorkDetails = () => (
  <form>
    <input type="text" required placeholder="Company:" />
    <input type="text" required placeholder="Position:" />
    <input type="text" required placeholder="Website:" />
    <div className="row rowtwo">
      <input className="left" type="text" required placeholder="Start Date: DD/MM/YYYY" />
      <input className="right" type="text" required placeholder="End Date: DD/MM/YYYY or Ongoing" />
    </div>
    <textarea resize="none" placeholder="Summary | Highlights : " />
  </form>
);

export default WorkDetails;
