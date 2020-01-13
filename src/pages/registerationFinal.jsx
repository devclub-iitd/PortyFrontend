import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createProfile } from '../actions/profile';
import { withRouter } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import Alert from '../components/fancyAlert';

import Intro from '../components/regFinal/intro';
import Image from '../components/regFinal/image';
import Account from '../components/regFinal/account';
import About from '../components/regFinal/about';
import Location from '../components/regFinal/location';
import Work from '../components/regFinal/work';
import Volunteer from '../components/regFinal/volunteer';
import Education from '../components/regFinal/education';
import Award from '../components/regFinal/award';
import Publication from '../components/regFinal/publication';
import Language from '../components/regFinal/language';
import Skill from '../components/regFinal/skill';
import Interest from '../components/regFinal/interest';
import Reference from '../components/regFinal/reference';
import '../style/regFinal.css';
import { getCurrentProfile } from '../actions/profile';


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

class RegFinal extends React.Component {
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
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handlePanel(panel) {
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

  async retrieveChildData(type, data) {
    switch (type) {
      case 'work':
      case 'volunteer':
      case 'education':
      case 'awards':
      case 'publications':
      case 'skills':
      case 'languages':
      case 'interests':
      case 'references':
      case 'about':
      case 'location': {
        this.setState({
          [type]: data
        });
        const obj = {
          [type]: data
        }
        const ts = JSON.stringify(obj)
        await this.props.createProfile(ts,this.props.history,false)
      }
    }
  }

  async handleSumbit(event) {
    event.preventDefault();
    //this.account.current.callApiRequest();
    await this.about.current.callApiRequest();
    await this.location.current.callApiRequest();
    await this.work.current.callApiRequest();
    await this.volunteer.current.callApiRequest();
    await this.education.current.callApiRequest();
    await this.award.current.callApiRequest();
    await this.publication.current.callApiRequest();
    await this.skill.current.callApiRequest();
    await this.language.current.callApiRequest();
    await this.interest.current.callApiRequest();
    await this.reference.current.callApiRequest();
    this.setState({
      open: true,
      alertTitle: 'Profile has been created!',
      alertContent: 'Kindly check the home page to view your portfolio',
    });
    //window.location.href = '../home';
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
      alertTitle: 'Whoops!',
      alertContent: 'There seems to be some sort of error. Check you have filled out all the fields and try again.',
    });
  }

  render() {
    const {
      expanded, open, alertTitle, alertContent,
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ paddingBottom: 100 }}>
          <Intro name={this.props.user.name} caption="block" />
          <form onSubmit={this.handleSumbit}>
            {/* <Account ref={this.account} expanded={expanded} action={() => this.handlePanel('accountPanel')} />  */}
            <About
              ref={this.about}
              expanded={expanded}
              action={() => this.handlePanel("aboutPanel")}
              senData={this.retrieveChildData}
            />
            <Location
              ref={this.location}
              expanded={expanded}
              action={() => this.handlePanel("locationPanel")}
              senData={this.retrieveChildData}
            />
            <Education
              ref={this.education}
              expanded={expanded}
              action={() => this.handlePanel("educationPanel")}
              senData={this.retrieveChildData}
            />
            <Work
              ref={this.work}
              expanded={expanded}
              action={() => this.handlePanel("workPanel")}
              senData={this.retrieveChildData}
            />
            <Volunteer
              ref={this.volunteer}
              expanded={expanded}
              action={() => this.handlePanel("volunteerPanel")}
              senData={this.retrieveChildData}
            />
            <Language
              ref={this.language}
              expanded={expanded}
              action={() => this.handlePanel("languagePanel")}
              senData={this.retrieveChildData}
            />
            <div className="regSubTitle">
              Optionals -
            </div>
            <Award
              ref={this.award}
              expanded={expanded}
              action={() => this.handlePanel("awardPanel")}
              senData={this.retrieveChildData}
            />
            <Publication
              ref={this.publication}
              expanded={expanded}
              action={() => this.handlePanel("publicationPanel")}
              senData={this.retrieveChildData}
            />
            <Skill
              ref={this.skill}
              expanded={expanded}
              action={() => this.handlePanel("skillPanel")}
              senData={this.retrieveChildData}
            />
            <Interest
              ref={this.interest}
              expanded={expanded}
              action={() => this.handlePanel("interestPanel")}
              senData={this.retrieveChildData}
            />
            <Reference
              ref={this.reference}
              expanded={expanded}
              action={() => this.handlePanel("referencePanel")}
              senData={this.retrieveChildData}
            />
            <div className="btnContainer">
              <Button
                variant="contained"
                style={{ padding: "12px 50px" }}
                color="secondary"
                type="submit"
                onSubmit={this.handleSumbit}
              >
                Done
              </Button>
            </div>
          </form>
          <Alert open={open} handleClose={this.handleClose} title={alertTitle}>
            {alertContent}
          </Alert>
          <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
              <Typography>
                <span style={{ fontWeight: 700, fontSize: '20px' }}>Portfolio Creator</span>
                {' '}
                <span style={{ color: '#3d40d8' }}>| Register</span>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile },
)(withRouter(RegFinal));


// <div className="headerSimple">
//   <div className="headerSimpleTitle">
//     Portfolio Creator|
//     {' '}
//     <span>Register</span>
//   </div>
// </div>
