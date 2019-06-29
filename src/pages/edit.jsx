import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handlePanel = this.handlePanel.bind(this);
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

  render() {
    const { expanded } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ paddingBottom: 100 }}>
          <Image />
          <Intro name="aryan" caption="none" />
          <form>
            <Account expanded={expanded} action={() => this.handlePanel('accountPanel')} />
            <About expanded={expanded} action={() => this.handlePanel('aboutPanel')} />
            <Location expanded={expanded} action={() => this.handlePanel('locationPanel')} />
            <Work expanded={expanded} action={() => this.handlePanel('workPanel')} />
            <Volunteer expanded={expanded} action={() => this.handlePanel('volunteerPanel')} />
            <Education expanded={expanded} action={() => this.handlePanel('educationPanel')} />
            <Award expanded={expanded} action={() => this.handlePanel('awardPanel')} />
            <Publication expanded={expanded} action={() => this.handlePanel('publicationPanel')} />
            <Skill expanded={expanded} action={() => this.handlePanel('skillPanel')} />
            <Language expanded={expanded} action={() => this.handlePanel('languagePanel')} />
            <Interest expanded={expanded} action={() => this.handlePanel('interestPanel')} />
            <Reference expanded={expanded} action={() => this.handlePanel('referencePanel')} />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Edit;
