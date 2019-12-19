import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Landing from "./portfolio/landing";
import About from "./portfolio/about";
import Education from "./portfolio/education";
import Work from "./portfolio/work";
import Volunteer from "./portfolio/volunteer";
import Extra from "./portfolio/extra";
import Contact from "./portfolio/contact";

import './portfolio.css';



function App(props) {
  const scrollFunc = () => scroll.scrollTo(window.innerHeight);
  const profile = props.appData.profile;
  return (
    <div class="portfolioContainerFull">
        <Landing
          name={profile.user.name}
          label={profile.about.label}
          initScroll={scrollFunc}
        />
        <div class="portfolioBodyCont" style={{ top: window.innerHeight + 'px' }}>
          <About summary={profile.about} top={window.innerHeight} />
          <Education education={profile.education} />
          <Work work={profile.work} />
          <Volunteer volunteer={profile.volunteer} />
          <Extra
            awards={profile.awards}
            publications={profile.publications}
            languages={profile.languages}
            skills={profile.skills}
          />
          <Contact
            email={profile.user.email}
            phone={profile.user.phone}
            location={profile.location}
          />
        </div>
      </div>
  );
}

export default App;
