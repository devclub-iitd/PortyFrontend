import React from 'react';
import PropTypes from 'prop-types';
import PaperCard from './cards/paper';

const Work = (props) => {
  const { work } = props;

  return (
    <div className="portfolioPage workPage">
      <div className="portfolioPageTitle">
        Work
      </div>
      <div className="portfolioCardContainer portfolioWorkCardContainer">
        {
          work.map(
            workPlace => (
              <PaperCard
                company={workPlace.company}
                position={workPlace.position}
                website={workPlace.website}
                startDate={workPlace.starstartDate}
                endDate={workPlace.endDate}
              >
                {workPlace.summary}
              </PaperCard>
            ),
          )
        }
      </div>
    </div>
  );
};

Work.propTypes = {
  work: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Work;
