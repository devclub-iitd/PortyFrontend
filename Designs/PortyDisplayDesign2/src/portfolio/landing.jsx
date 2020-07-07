import React from 'react';
import PropTypes from 'prop-types';

const Landing = (props) => {
    const { name, label, img, initScroll } = props;
    let userImage;
    if (img.trim().length > 0) {
        userImage = (
            <img className="portfolioUserImage" src={img} alt="Broken URL" />
        );
    }
    return (
        <div className="portfolioPage1">
            <div className="portfolioPage1Details">
                {userImage}
                <div className="portfolioUserDetails">
                    <span className="portfolioUserName">{name}</span>{' '}
                    <span className="portfolioUserLabel">| {label}</span>
                    <div className="miniLine" />
                </div>
            </div>
            <div className="portfolioPage1SocialHolder">
                <div
                    className="portfolioBtn"
                    onClick={initScroll}
                    onKeyPress={initScroll}
                    role="button"
                    tabIndex={0}
                >
                    Learn More
                </div>
            </div>
        </div>
    );
};

Landing.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    initScroll: PropTypes.func.isRequired,
};

export default Landing;
