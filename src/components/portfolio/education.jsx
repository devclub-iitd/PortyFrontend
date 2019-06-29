import React from 'react';
import FlatCard from './cards/flat';

const Education = () => (
  <div className="portfolioPage portfolioEducationPage">
    <div className="portfolioPageTitle">
      Education
    </div>
    <div className="miniLine" />
    <div className="portfolioFlatContainer">
      <FlatCard
        institution="institution"
        degree="degree"
        area="area"
        grade={10}
        startDate="DD/MM/YYYY"
        endDate="DD/MM/YYYY"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </FlatCard>
    </div>
  </div>
);

export default Education;
