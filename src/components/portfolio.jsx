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
  render() {
    return (
      <Paper className="portfolioContainer" elavation={4}>
        <Landing />
        <About />
        <Education />
        <Work />
        <Volunteer />
        <Extra />
        <Contact />
      </Paper>
    );
  }
}

export default Portfolio;
