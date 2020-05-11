import React from 'react';
import PropTypes from 'prop-types';

const Contact = (props) => {
  const {
    email, phone, location,
  } = props;

  return (
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
              {email}
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
              {phone}
            </span>
          </span>
        </li>
        <div className="miniLine" />
      </div>
      <div className="portfolioContactCard">
        <div className="miniLine" />
        <div className="portfolioContactCardAddress">
          <span>{location.addressline1}</span>
          <br />
          <span>{location.addressline2}</span>
          <br />
          {location.city}
          <br />
          {location.country}
          {' '}
          |
          {' '}
          {location.pincode}
        </div>
        <div className="miniLine" />
      </div>
    </div>
  );
};

Contact.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Contact;
