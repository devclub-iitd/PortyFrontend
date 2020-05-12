import React from 'react';
import PropTypes from 'prop-types';

const Landing = (props) => {
    const { name, label, img } = props;
    return (
        <div className="portfolioPage1">
            <div className="portfolioPage1Details">
                <img
                    className="portfolioUserImage"
                    src={img}
                    alt={'User Portfolio'}
                />
                <div className="portfolioUserDetails">
                    <span className="portfolioUserName">{name}</span>{' '}
                    <span className="portfolioUserLabel">| {label}</span>
                    <div className="miniLine" />
                </div>
            </div>
            <div className="portfolioPage1SocialHolder">
                <div className="portfolioBtn" onClick={props.initScroll}>
                    Learn More
                </div>
            </div>
        </div>
    );
};

Landing.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Landing;
