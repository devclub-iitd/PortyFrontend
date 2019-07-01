import React from 'react';
import PaperCard from './cards/paper';

const Work = () => (
  <div className="portfolioPage workPage">
    <div className="portfolioPageTitle">
      Work
    </div>
    <div className="portfolioCardContainer portfolioWorkCardContainer">
      <PaperCard
        company="company"
        position="position"
        website="websiteName"
        startDate="DD/MM/YYYY"
        endDate="DD/MM/YYYY"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </PaperCard>
    </div>
  </div>
);

export default Work;
