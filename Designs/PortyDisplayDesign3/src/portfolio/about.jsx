import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
    const { summary } = props;
    const about = summary.summary;
    return (
        <div className="portfolioPage aboutPage">
            <div className="portfolioPageSplit leftAbout">
                <div className="aboutCard">About Me</div></div>
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
    summary: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default About;
