import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
  const { summary } = props;
  const about = summary.summary;
  return (
    <div className="portfolioPage aboutPage">
      <div className="portfolioPageSplit rightAbout">
        <div className="portfolioUserSummary">
          <div className="miniLine" />
          {about}
          <div className="miniLine" />
        </div>
      </div>
      <div className="portfolioPageSplit leftAbout">About me</div>
    </div>
  );
};

About.propTypes = {
  summary: PropTypes.string.isRequired,
};

export default About;
