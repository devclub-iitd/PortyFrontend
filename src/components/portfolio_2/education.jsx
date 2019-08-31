import React from 'react';
import PropTypes from 'prop-types';
import PaperCard from './cards/paper';

const Education = (props) => {
  const { education } = props;

  return (
    <div className="portfolioPage portfolioEducationPage">
      <div className="portfolioPageTitle">
        Education
      </div>
      <div className="miniLine" />
      <div className="portfolioFlatContainer">
        {
          education.map(
            educationPlace => (
              <PaperCard
                institution={educationPlace.institution}
                degree={educationPlace.qualification}
                area={educationPlace.area}
                grade={educationPlace.gpa}
                startDate={educationPlace.startdate}
                endDate={educationPlace.enddate}
              >
                {educationPlace.details}
              </PaperCard>
            ),
          )
        }
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.objectOf(PropTypes.object).isRequired,
};


export default Education;
