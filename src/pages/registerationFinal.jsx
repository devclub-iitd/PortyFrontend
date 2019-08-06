import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {createProfile} from '../actions/profile'


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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255,255,255,1)',
    },
    secondary: {
      main: '#3d40d8',
    },
  },
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

  retrieveChildData (type , data) {
    switch(type) {
        case 'work' :
        case 'volunteer':
        case 'education':
        case 'awards':
        case 'publications':
        case 'skills':
        case 'languages':
        case 'interests':
        case 'references':
        case 'location': 
        {
            this.setState({
              [type]: data,
            });
            const obj = { [type]: data }
            console.log(obj)
            const stringyobj = JSON.stringify(obj)
            this.props.createProfile(stringyobj)
        } 
        
    }
    
  }

  handleSumbit(event) {
    event.preventDefault();
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
  }

  render() {
    const { expanded } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ paddingBottom: 100 }}>
          <Image />
          <Intro name="aryan" caption="block" />
          <form onSubmit={this.handleSumbit}>
            {/* <Account ref={this.account} expanded={expanded} action={() => this.handlePanel('accountPanel')} />  */}
            <About ref={this.about} expanded={expanded} action={() => this.handlePanel('aboutPanel')} senData={this.retrieveChildData}/> 
            <Location ref={this.location} expanded={expanded} action={() => this.handlePanel('locationPanel')} senData={this.retrieveChildData} />
            <Work ref={this.work} expanded={expanded} action={() => this.handlePanel('workPanel')} senData={this.retrieveChildData}/>
            <Volunteer ref={this.volunteer} expanded={expanded} action={() => this.handlePanel('volunteerPanel')} senData={this.retrieveChildData} />
            <Education ref={this.education} expanded={expanded} action={() => this.handlePanel('educationPanel')} senData={this.retrieveChildData}/>
            <Award ref={this.award} expanded={expanded} action={() => this.handlePanel('awardPanel')} senData={this.retrieveChildData}/>
            <Publication ref={this.publication} expanded={expanded} action={() => this.handlePanel('publicationPanel')} senData={this.retrieveChildData}/>
            <Skill ref={this.skill} expanded={expanded} action={() => this.handlePanel('skillPanel')} senData={this.retrieveChildData}/>
            <Language ref={this.language} expanded={expanded} action={() => this.handlePanel('languagePanel')} senData={this.retrieveChildData}/>
            <Interest ref={this.interest} expanded={expanded} action={() => this.handlePanel('interestPanel')} senData={this.retrieveChildData}/>
            <Reference ref={this.reference} expanded={expanded} action={() => this.handlePanel('referencePanel')} senData={this.retrieveChildData}/>
            <div className="btnContainer">
              <Button variant="contained" style={{ padding: '12px 50px' }} color="secondary" type="submit">
                Done
              </Button>
            </div>
          </form>
          <div className="headerSimple">
            <div className="headerSimpleTitle">
              Portfolio Creator
              {' '}
              <span>
                  | Register
              </span>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null,{createProfile})(RegFinal);
