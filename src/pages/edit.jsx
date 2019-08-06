import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profile";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Intro from "../components/regFinal/intro";
import Image from "../components/regFinal/image";
import Account from "../components/regFinal/account";
import About from "../components/regFinal/about";
import Location from "../components/regFinal/location";
import Work from "../components/regFinal/work";
import Volunteer from "../components/regFinal/volunteer";
import Education from "../components/regFinal/education";
import Award from "../components/regFinal/award";
import Publication from "../components/regFinal/publication";
import Language from "../components/regFinal/language";
import Skill from "../components/regFinal/skill";
import Interest from "../components/regFinal/interest";
import Reference from "../components/regFinal/reference";
import "../style/regFinal.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(255,255,255,1)"
    },
    secondary: {
      main: "#3d40d8"
    }
  }
});

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handlePanel = this.handlePanel.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    if (expanded === panel) {
      this.setState({
        expanded: false
      });
    } else {
      this.setState({
        expanded: panel
      });
    }
  }

  render() {
    const { loading, profile } = this.props.profile;
    const { expanded } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ paddingBottom: 100 }}>
          <Image />
          <Intro name="aryan" caption="none" />
          <form>
            {/* <Account
              expanded={expanded}
              action={() => this.handlePanel("accountPanel")}
              existingData={profile.account}
            /> */}
            <About
              expanded={expanded}
              action={() => this.handlePanel("aboutPanel")}
              existingData={profile.about}
            />
            <Location
              expanded={expanded}
              action={() => this.handlePanel("locationPanel")}
              existingData={profile.location}
            />
            <Work
              expanded={expanded}
              action={() => this.handlePanel("workPanel")}
              existingData={profile.work}
            />
            <Volunteer
              expanded={expanded}
              action={() => this.handlePanel("volunteerPanel")}
              existingData={profile.volunteer}
            />
            <Education
              expanded={expanded}
              action={() => this.handlePanel("educationPanel")}
              existingData={profile.education}
            />
            <Award
              expanded={expanded}
              action={() => this.handlePanel("awardPanel")}
              existingData={profile.awards}
            />
            <Publication
              expanded={expanded}
              action={() => this.handlePanel("publicationPanel")}
              existingData={profile.publications}
            />
            <Skill
              expanded={expanded}
              action={() => this.handlePanel("skillPanel")}
              existingData={profile.skills}
            />
            <Language
              expanded={expanded}
              action={() => this.handlePanel("languagePanel")}
              existingData={profile.languages}
            />
            <Interest
              expanded={expanded}
              action={() => this.handlePanel("interestPanel")}
              existingData={profile.interests}
            />
            <Reference
              expanded={expanded}
              action={() => this.handlePanel("referencePanel")}
              existingData={profile.references}
            />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

Edit.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Edit);
