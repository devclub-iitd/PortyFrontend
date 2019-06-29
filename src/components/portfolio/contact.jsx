import React from 'react';

const Contact = () => (
  <div className="portfolioPage contactPage">
    <div className="portfolioPageTitle">
      Contact Me
    </div>
    <div className="portfolioContactCard">
      <div className="miniLine" />
      <li>
        <span className="portfolioContactCardInfo">
          <span className="portfolioContactCardInfoTitle">
            Email ID -
          </span>
          {' '}
          <span className="portfolioContactCardInfoDetails">
            aryanguptaleo@gmail.com
          </span>
        </span>
      </li>
      <li>
        <span className="portfolioContactCardInfo">
          <span className="portfolioContactCardInfoTitle">
            Contact No -
          </span>
          {' '}
          <span className="portfolioContactCardInfoDetails">
            191191919919
          </span>
        </span>
      </li>
      <div className="miniLine" />
    </div>
    <div className="portfolioContactCard">
      <div className="miniLine" />
      <div className="portfolioContactCardAddress">
        <span>Adress line one to make it slightly longer</span>
        <br />
        Adress line two with random
        <br />
        city | pincode
      </div>
      <div className="miniLine" />
    </div>
    <div className="portfolioContactCard portfolioContactSocialCard">
      <span>insert social icons with clickable links</span>
    </div>
  </div>
);

export default Contact;
