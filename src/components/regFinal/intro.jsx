import React from 'react';

const Intro = props => (
  <div className="introContainer">
    <div className="pageTitle">
      Welcome,
      {' '}
      {props.name}
    </div>
    <div className="pageTagline">Just a few more things to get you started...</div>
  </div>
);

export default Intro;
