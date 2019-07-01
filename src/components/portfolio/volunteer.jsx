import React from 'react';
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
    return (
      <div className="portfolioPage volunteerPage">
        <div className="portfolioPageSplit leftVolunteer">
          <ExpansionCard
            organisation="organisation"
            position="position"
            website="websiteName"
            startDate="DD/MM/YYYY"
            endDate="DD/MM/YYYY"
            handlePanelChange={this.handlePanelChange}
            expanded={expanded}
            id={1}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ExpansionCard>
          <ExpansionCard
            organisation="organisation"
            position="position"
            website="websiteName"
            startDate="DD/MM/YYYY"
            endDate="DD/MM/YYYY"
            handlePanelChange={this.handlePanelChange}
            expanded={expanded}
            id={2}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ExpansionCard>
        </div>
        <div className="portfolioPageSplit rightVolunteer">
          Volunteering
        </div>
      </div>
    );
  }
}

export default Volunteer;
