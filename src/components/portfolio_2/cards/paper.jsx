import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const PaperCard = (props) => {
  const {
    institution, degree, area, children, grade, startDate, endDate,
  } = props;
  return (
    <Paper className="portfolioCard portfolioWorkCard">
      <div className="portfolioCardTitle">
        <span className="portfolioCardTitleMain">{institution}</span>
        {' '}
        <span className="portfolioCardTitleSub">
          |
          {' '}
          {degree}
        </span>
        <div className="portfolioCardTitleSub">
          {area}
        </div>
      </div>
      <div className="miniLine miniCardLine" />
      <div className="portfolioCardContent">
        {children}
      </div>
      <div className="miniLine miniCardLine" />
      <div className="portfolioCardWebsite">
        <span>Grade Pt |</span>
        {' '}
        {grade}
      </div>
      <div className="portfolioCardDateContainer">
        {startDate}
        {' '}
        -
        {' '}
        {endDate}
      </div>
    </Paper>
  );
};

PaperCard.propTypes = {
  company: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default PaperCard;
