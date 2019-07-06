import React from 'react';
import Paper from '@material-ui/core/Paper';

import Landing from './portfolio/landing';
import About from './portfolio/about';
import Education from './portfolio/education';
import Work from './portfolio/work';
import Volunteer from './portfolio/volunteer';
import Extra from './portfolio/extra';
import Contact from './portfolio/contact';

import '../style/portfolio.css';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      label: '',
      email: '',
      phone: '',
      about: '',
      location: '',
      education: '',
      work: '',
      volunteer: '',
      awards: '',
      publications: '',
      skills: '',
      languages: '',
    };
    this.getUserData();
  }

  getUserData = () => {
    fetch('/api/getUserData')
      .then(res => res.json())
      .then(
        user => this.setState({
          name: user.basics.name,
          label: user.basics.label,
          email: user.basics.email,
          phone: user.basics.phone,
          about: user.basics.summary,
          location: user.basics.location,
          education: user.education,
          work: user.work,
          volunteer: user.volunteer,
          awards: user.awards,
          publications: user.publications,
          skills: user.skills,
          languages: user.languages,
        }),
      );
  }

  render() {
    const {
      name,
      label,
      email,
      phone,
      about,
      location,
      education,
      work,
      volunteer,
      awards,
      publications,
      skills,
      languages,
    } = this.state;
    return (
      <Paper className="portfolioContainer" elavation={4}>
        <Landing name={name} label={label} />
        <About summary={about} />
        <Education education={education} />
        <Work work={work} />
        <Volunteer volunteer={volunteer} />
        <Extra
          awards={awards}
          publications={publications}
          languages={languages}
          skills={skills}
        />
        <Contact
          email={email}
          phone={phone}
          location={location}
        />
      </Paper>
    );
  }
}

export default Portfolio;
