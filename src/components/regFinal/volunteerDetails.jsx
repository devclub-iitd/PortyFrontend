import React from 'react';


const VolunteerDetails = () => (
  <form>
    <input type="text" required placeholder="Organisation:"></input>
    <input type="text" required placeholder="Position:"></input>
    <input type="text" required placeholder="Website:"></input>
    <div className="row rowtwo">
      <input className="left"type="text" required placeholder="Start Date: DD/MM/YYYY"></input>
      <input className="right"type="text" required placeholder="End Date: DD/MM/YYYY or Ongoing"></input>
    </div>
    <textarea resize="none" placeholder="Summary | Highlights : "></textarea>
  </form>
);

export default VolunteerDetails;
