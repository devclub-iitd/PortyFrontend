import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
    const { img } = props;
    return (
        <div className="imageContainerEdit">
            <div className="userImgContainer">
                <img className="userImg" src={img} alt="User Profile" />
            </div>
        </div>
    );
};

Image.propTypes = {
    img: PropTypes.string.isRequired,
};

export default Image;
