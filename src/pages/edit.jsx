import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../actions/profile";
import { createProfile } from "../actions/profile";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


import Intro from "../components/edit/intro";
import Image from "../components/edit/image";
import Account from "../components/edit/account";
import About from "../components/edit/about";
import Location from "../components/edit/location";
import Work from "../components/edit/work";
import Volunteer from "../components/edit/volunteer";
import Education from "../components/edit/education";
import Award from "../components/edit/award";
import Publication from "../components/edit/publication";
import Language from "../components/edit/language";
import Skill from "../components/edit/skill";
import Interest from "../components/edit/interest";
import Reference from "../components/edit/reference";
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
    this.account = React.createRef();
    this.about = React.createRef();
    this.location = React.createRef();
    this.work = React.createRef();
    this.volunteer = React.createRef();
    this.education = React.createRef();
    this.award = React.createRef();
    this.publication = React.createRef();
    this.skill = React.createRef();
    this.language = React.createRef();
    this.interest = React.createRef();
    this.reference = React.createRef();
    this.handlePanel = this.handlePanel.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
    this.retrieveChildData = this.retrieveChildData.bind(this);
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

  retrieveChildData(type, data) {
    switch (type) {
      case "work":
      case "volunteer":
      case "education":
      case "awards":
      case "publications":
      case "skills":
      case "about":
      case "languages":
      case "interests":
      case "references":
      case "location": {
        const obj = {
          [type]: data
        };
        console.log(obj);
        const stringyobj = JSON.stringify(obj);
        this.props.createProfile(stringyobj, this.props.history );
        
      }
    }
  }

  handleSumbit(event) {
    event.preventDefault();
    //alert("being submitted");
    //this.account.current.callApiRequest();
    this.about.current.callApiRequest();
    this.location.current.callApiRequest();
    this.work.current.callApiRequest();
    this.volunteer.current.callApiRequest();
    this.education.current.callApiRequest();
    this.award.current.callApiRequest();
    this.publication.current.callApiRequest();
    this.skill.current.callApiRequest();
    this.language.current.callApiRequest();
    this.interest.current.callApiRequest();
    this.reference.current.callApiRequest();
    alert('Profile updated')
  }

  render() {
    const { loading, profile } = this.props.profile;
    const { expanded } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ paddingBottom: 100 }}>
          <Image />
          <Intro name="aryan" caption="none" />
          <form onSubmit={this.handleSumbit}>
            {/* <Account
                ref={this.}
              expanded={expanded}
              action={() => this.handlePanel("accountPanel")}
              existingData={profile.account}
            /> */}
            <About
              ref={this.about}
              expanded={expanded}
              action={() => this.handlePanel("aboutPanel")}
              existingData={profile.about}
              senData={this.retrieveChildData}
            />
            <Location
              ref={this.location}
              expanded={expanded}
              action={() => this.handlePanel("locationPanel")}
              existingData={profile.location}
              senData={this.retrieveChildData}
            />
            <Work
              ref={this.work}
              expanded={expanded}
              action={() => this.handlePanel("workPanel")}
              existingData={profile.work}
              senData={this.retrieveChildData}
            />
            <Volunteer
              ref={this.volunteer}
              expanded={expanded}
              action={() => this.handlePanel("volunteerPanel")}
              existingData={profile.volunteer}
              senData={this.retrieveChildData}
            />
            <Education
              ref={this.education}
              expanded={expanded}
              action={() => this.handlePanel("educationPanel")}
              existingData={profile.education}
              senData={this.retrieveChildData}
            />
            <Award
              ref={this.award}
              expanded={expanded}
              action={() => this.handlePanel("awardPanel")}
              existingData={profile.awards}
              senData={this.retrieveChildData}
            />
            <Publication
              ref={this.publication}
              expanded={expanded}
              action={() => this.handlePanel("publicationPanel")}
              existingData={profile.publications}
              senData={this.retrieveChildData}
            />
            <Skill
              ref={this.skill}
              expanded={expanded}
              action={() => this.handlePanel("skillPanel")}
              existingData={profile.skills}
              senData={this.retrieveChildData}
            />
            <Language
              ref={this.language}
              expanded={expanded}
              action={() => this.handlePanel("languagePanel")}
              existingData={profile.languages}
              senData={this.retrieveChildData}
            />
            <Interest
              ref={this.interest}
              expanded={expanded}
              action={() => this.handlePanel("interestPanel")}
              existingData={profile.interests}
              senData={this.retrieveChildData}
            />
            <Reference
              ref={this.reference}
              expanded={expanded}
              action={() => this.handlePanel("referencePanel")}
              existingData={profile.references}
              senData={this.retrieveChildData}
            />
            <div className="btnContainer">
              <Button
                variant="contained"
                style={{ padding: "12px 50px" }}
                color="secondary"
                type="submit"
              >
                Done
              </Button>
            </div>
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
  { getCurrentProfile , createProfile }
)(Edit);
