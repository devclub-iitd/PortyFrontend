import React from 'react';
import PropTypes from 'prop-types';

const Intro = (props) => {
  const { name, caption } = props;
  return (
    <div className="introContainer">
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
