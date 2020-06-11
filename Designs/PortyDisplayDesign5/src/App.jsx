import React from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import Landing from './portfolio/landing';
import About from './portfolio/about';
import Education from './portfolio/education';
import Work from './portfolio/work';
import Volunteer from './portfolio/volunteer';
import Extra from './portfolio/extra';
import Contact from './portfolio/contact';
import './index.css';
import './portfolio.css'
import './style/main.scss';

function App(props) {
    const scrollFunc = () => scroll.scrollTo(window.innerHeight);
    const { appData } = props;
    const { profile } = appData;
    return (
        <div className="portfolioContainerFull">
            <Landing
                name={profile.user.name}
                label={profile.about.label}
                img={profile.about.imgUrl}
                initScroll={scrollFunc}
            />
            <div
                className="portfolioBodyCont"
                style={{ top: `${window.innerHeight}px` }}
            >
                <About summary={profile.about} img={profile.about.imgUrl} top={window.innerHeight} />
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
                    phone={profile.about.number}
                    location={profile.location}
                />
            </div>
        </div>
    );
}

App.propTypes = {
    appData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default App;
