import React from 'react';
import PropTypes from 'prop-types';

const FlatCard = (props) => {
  const {
    institution,
    degree,
    area,
    children,
    website,
    startDate,
    endDate,
  } = props;
  return (
    <div className="portfolioFlat">
      <div className="portfolioCardTitle">
        <span className="portfolioCardTitleMain">{institution} |</span>{' '}
        <span className="portfolioCardTitleSub">{degree}</span>
        <div className="portfolioFlatSubTitle">{area}</div>
      </div>
      <div className="portfolioFlatContent">
        <div className="portfolioFlatContentSummary">{children}</div>
        <div className="portfolioFlatSubTitle portfolioCardWebsite">
          Website:
          {' '}
          <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
        </div>
      </div>
      <div className="portfolioCardDateContainer">
        {startDate} - {endDate}
      </div>
    </div>
  );
};

FlatCard.propTypes = {
  institution: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default FlatCard;
