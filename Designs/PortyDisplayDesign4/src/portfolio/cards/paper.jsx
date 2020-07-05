import React from 'react';
import PropTypes from 'prop-types';

const PaperCard = (props) => {
    const { company, position, children, website, startDate, endDate } = props;
    return (
        <div className="portfolioCard portfolioWorkCard">
            <div className="portfolioCardTitle">
                <span className="portfolioCardTitleMain">{company}</span>{' '}
                <span className="portfolioCardTitleSub">| {position}</span>
            </div>
            <div className="miniLine miniCardLine" />
            <div className="portfolioCardContent">{children}</div>
            <div className="miniLine miniCardLine" />
            <div className="portfolioCardWebsite">
                <span>Website |</span>{' '}
                <a href={website} target="_blank" rel="noopener noreferrer">
                    Link to page
                </a>
            </div>
            <div className="portfolioCardDateContainer">
                {startDate} - {endDate}
            </div>
        </div>
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
