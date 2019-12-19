import React from 'react';
import PropTypes from 'prop-types';

const FlatCard = (props) => {
  const {
    company, position, children, website, startDate, endDate,
  } = props;
  return (
    <div className="portfolioFlat">
      <div className="portfolioCardTitle">
        <span className="portfolioCardTitleMain">
          {company}
          {' '}
           |
        </span>
        {' '}
        <span className="portfolioCardTitleSub">
          {position}
        </span>
        <div className="portfolioFlatSubTitle">
          {area}
        </div>
      </div>
      <div className="portfolioFlatContent">
        <div className="portfolioFlatContentSummary">
          {children}
        </div>
        <div className="portfolioCardWebsite">
          <span>Website |</span>
          {' '}
          <a href={website}>{website}</a>
        </div>
      </div>
      <div className="portfolioCardDateContainer">
        {startDate}
         -
        {' '}
        {endDate}
      </div>
    </div>
  );
};

FlatCard.propTypes = {
  institution: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  grade: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default FlatCard;
