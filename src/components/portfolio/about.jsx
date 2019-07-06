import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
  const { about } = props;
  return (
    <div className="portfolioPage aboutPage">
      <div className="portfolioPageSplit leftAbout">
        About me
      </div>
      <div className="portfolioPageSplit rightAbout">
        <div className="portfolioUserSummary">
          <div className="miniLine" />
          {about}
          <div className="miniLine" />
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  about: PropTypes.string.isRequired,
};

export default About;
