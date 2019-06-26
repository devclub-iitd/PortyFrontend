import React from 'react';
import PropTypes from 'prop-types';

const Intro = (props) => {
  const { name } = props;
  return (
    <div className="introContainer">
      <div className="pageTitle">
        Welcome,
        {' '}
        {name}
      </div>
      <div className="pageTagline">Just a few more things to get you started...</div>
    </div>
  );
};

Intro.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Intro;
