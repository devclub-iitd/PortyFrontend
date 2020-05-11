import React from 'react';

const Image = (props) => (
    <div className="imageContainerEdit">
        <div className="userImgContainer">
            <img className="userImg" src={props.img} />
        </div>
    </div>
);

export default Image;
