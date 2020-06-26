import React from 'react';
import PropTypes from 'prop-types';

const Intro = (props) => {
    const { name, caption } = props;
    let mystyle = {
        marginTop: '20px',
    };
    if (caption !== 'none') {
        mystyle = {
            marginTop: '100px',
        };
    }
    return (
        <div className="introContainer" style={mystyle}>
            <div className="pageTitle">Welcome, {name}</div>
            <div className="pageTagline" style={{ display: caption }}>
                Just a few more things to get you started...
            </div>
        </div>
    );
};

Intro.propTypes = {
    name: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
};

export default Intro;
