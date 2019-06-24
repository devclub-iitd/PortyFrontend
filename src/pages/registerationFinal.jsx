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
      expanded: false,
    };
    this.handlePanel = this.handlePanel.bind(this);
  }

  handlePanel(panel) {
    if (this.state.expanded === panel) {
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
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ paddingBottom: 100 }}>
          <Image />
          <Intro name="aryan" />
          <form>
            <Account expanded={this.state.expanded} action={() => this.handlePanel('accountPanel')} />
            <About expanded={this.state.expanded} action={() => this.handlePanel('aboutPanel')} />
            <Location expanded={this.state.expanded} action={() => this.handlePanel('locationPanel')} />
            <Work expanded={this.state.expanded} action={() => this.handlePanel('workPanel')} />
            <Volunteer expanded={this.state.expanded} action={() => this.handlePanel('volunteerPanel')} />
            <Education expanded={this.state.expanded} action={() => this.handlePanel('educationPanel')} />
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

export default RegFinal;
