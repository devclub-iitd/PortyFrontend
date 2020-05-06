import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
  const about = props.summary.summary;
  // console.log("about props below")
  // console.log(props.summary.summary);
  return (
    <div className="portfolioPage aboutPage">
    <div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <h1>About Me</h1>
    </div>
    <div className="flip-card-back">
    <div className="portfolioUserSummary">
    {about}
    </div>
    </div>
  </div>
</div>
    </div>
  );
};

About.propTypes = {
  about: PropTypes.string.isRequired,
};

export default About;
