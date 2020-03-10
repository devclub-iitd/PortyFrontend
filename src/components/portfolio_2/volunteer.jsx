import React from 'react';
import PropTypes from 'prop-types';
import ExpansionCard from './cards/expand';

class Volunteer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handlePanelChange = this.handlePanelChange.bind(this);
  }

  handlePanelChange(panel) {
    const { expanded } = this.state;
    if (expanded === panel) {
      this.setState({
        expanded: false,
      });
    } else {
      this.setState({
        expanded: panel,
      });
    }
  }

  render() {
    const { expanded } = this.state;
    const { volunteer } = this.props;
    return (
      <div className="portfolioPage volunteerPage">
        <div className="portfolioPageSplit rightVolunteer">
          Volunteering | POR
        </div>
        <div className="portfolioPageSplit leftVolunteer">
          {
            volunteer.map(
              (volunteerPlace, index) => (
                <ExpansionCard
                  organisation={volunteerPlace.organisation}
                  position={volunteerPlace.position}
                  website={volunteerPlace.website}
                  startDate={volunteerPlace.startdate}
                  endDate={volunteerPlace.enddate}
                  handlePanelChange={this.handlePanelChange}
                  expanded={expanded}
                  id={index}
                >
                  {volunteerPlace.summary}
                </ExpansionCard>
              ),
            )
          }
        </div>
      </div>
    );
  }
}

Volunteer.propTypes = {
  volunteer: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Volunteer;
