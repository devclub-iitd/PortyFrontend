import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
    const { img } = props;
    let userImage;
    if (img.trim().length > 0) {
        userImage = (
            <img className="portfolioUserImage" src={img} alt="Broken URL" />
        );
    }
    return (
        <div className="imageContainerEdit">
            <div className="userImgContainer">{userImage}</div>
        </div>
    );
};

Image.propTypes = {
    img: PropTypes.string.isRequired,
};

export default Image;
