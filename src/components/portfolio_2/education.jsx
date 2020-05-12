import React from 'react';
import PropTypes from 'prop-types';
import PaperCard from './cards/paper';

const Education = (props) => {
    const { education } = props;

    return (
        <div className="portfolioPage portfolioEducationPage">
            <div className="portfolioPageTitle">Education</div>
            <div className="miniLine pageMiniLine" />
            <div className="portfolioFlatContainer">
                {education.map((educationPlace) => (
                    <PaperCard
                        company={educationPlace.institution}
                        position={educationPlace.area}
                        grade={educationPlace.gpa}
                        startDate={educationPlace.startdate}
                        endDate={educationPlace.enddate}
                        degree={educationPlace.qualification}
                    >
                        {educationPlace.details}
                    </PaperCard>
                ))}
            </div>
        </div>
    );
};

Education.propTypes = {
    education: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Education;
