import React from 'react';
import PropTypes from 'prop-types';
import FlatCard from './cards/flat';

const Work = (props) => {
    const { work } = props;

    return (
        <div className="portfolioPage workPage">
            <div className="portfolioPageTitle">Work</div>
            <div className="portfolioCardContainer portfolioWorkCardContainer">
                {work.map((workPlace) => (
                    <FlatCard
                        institution={workPlace.company}
                        degree={workPlace.position}
                        website={workPlace.website}
                        startDate={workPlace.startdate}
                        endDate={workPlace.enddate}
                    >
                        {workPlace.summary}
                    </FlatCard>
                ))}
            </div>
        </div>
    );
};

Work.propTypes = {
    work: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Work;
