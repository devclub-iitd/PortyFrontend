import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons.cjs';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { animateScroll as scroll } from 'react-scroll';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import HeaderIcons from '../components/header-icons/header-icons.component';
import HeaderBackground from '../components/header-background/header-background.component';
import { ReactComponent as Sun } from '../components/portfolio_5/assets/sun.svg';
import { ReactComponent as ProcessBuilding } from '../components/portfolio_5/assets/process_building.svg';
import { ReactComponent as Mountain } from '../components/portfolio_5/assets/mountain.svg';
import { ReactComponent as DataProcess } from '../components/portfolio_5/assets/data_process.svg';
import { ReactComponent as DataAnalytics } from '../components/portfolio_5/assets/data_analytics_.svg';
import { ReactComponent as Cloud } from '../components/portfolio_5/assets/cloud.svg';
import Landing from '../components/portfolio_5/landing';
import About from '../components/portfolio_5/about';
import Education from '../components/portfolio_5/education';
import Work from '../components/portfolio_5/work';
import Volunteer from '../components/portfolio_5/volunteer';
import Extra from '../components/portfolio_5/extra';
import Contact from '../components/portfolio_5/contact';

import Loader from '../components/loader';

import '../style/portfolio_5.css';

import { getCurrentProfile as getCurrentProfile_ } from '../actions/profile';

const useStyles = makeStyles(() => ({
    button: {
        width: '150px',
        height: '40px',
        marginTop: '30px',
        borderRadius: '5px',
    },
}));
const navToReg = () => {
    window.location.href = '../register';
};
const Portfolio = ({
    getCurrentProfile,
    isAuthenticated,
    auth,
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const classes = useStyles();
    const scrollFunc = () => scroll.scrollTo(window.innerHeight);

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (!loading && profile !== null && !auth.loading && auth.isAuthenticated) {
        return (
            <div className="portfolioContainerFull5">
                <Parallax pages={4.5}>
                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        style={{ backgroundColor: '#00745F' }}
                    />
                    <ParallaxLayer
                        offset={1}
                        speed={0}
                        style={{ backgroundColor: '#0A1034' }}
                    />
                    <ParallaxLayer
                        offset={2}
                        speed={0}
                        style={{ backgroundColor: '#65B0B1' }}
                    />
                    <ParallaxLayer
                        offset={3}
                        speed={0}
                        style={{ backgroundColor: '#424C5E' }}
                    />
                    <ParallaxLayer
                        offset={4}
                        speed={0}
                        style={{
                            backgroundColor: 'rgb(1, 0, 34)',
                            opacity: 0.8,
                        }}
                    />

                    <ParallaxLayer offset={0} speed={0}>
                        <HeaderBackground />
                    </ParallaxLayer>
                    <ParallaxLayer offset={0} speed={0.3}>
                        <HeaderIcons />
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={0}
                        speed={0.8}
                        style={{ opacity: 0.4 }}
                    >
                        <Cloud
                            style={{
                                display: 'block',
                                width: '20%',
                                marginLeft: '25%',
                            }}
                        />
                        <Cloud
                            style={{
                                display: 'block',
                                width: '10%',
                                marginLeft: '45%',
                            }}
                        />
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={1}
                        speed={-0.2}
                        style={{ opacity: 0.7 }}
                    >
                        <Cloud
                            style={{
                                display: 'block',
                                width: '20%',
                                marginLeft: '55%',
                            }}
                        />
                        <Cloud
                            style={{
                                display: 'block',
                                width: '10%',
                                marginLeft: '15%',
                            }}
                        />
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={0.25}
                        speed={0.3}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DataAnalytics
                            style={{
                                width: `${
                                    window.innerWidth < 960 ? '40%' : '20%'
                                }`,
                                marginLeft: '60%',
                            }}
                        />
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={1.15}
                        speed={0.7}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Sun style={{ width: '20%', marginLeft: '20%' }} />
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={2.25}
                        speed={0.9}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DataProcess
                            style={{
                                width: '70%',
                                marginRight: '10%',
                                opacity: '0.7',
                            }}
                        />
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={3.25}
                        speed={0.9}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ProcessBuilding
                            style={{ width: '20%', marginRight: '60%' }}
                        />
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={3}
                        speed={-0.2}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Mountain style={{ width: '20%', marginLeft: '60%' }} />
                    </ParallaxLayer>

                    <ParallaxLayer
                        offset={-0.4}
                        speed={-0.2}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '10%',
                            cursor: 'pointer',
                        }}
                    >
                        <Landing
                            name={profile.user.name}
                            label={profile.about.label}
                            img={profile.about.imgUrl}
                            initScroll={scrollFunc}
                        />
                    </ParallaxLayer>
                    <ParallaxLayer offset={1} speed={0.3}>
                        <About
                            summary={profile.about}
                            top={window.innerHeight}
                        />
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
                    </ParallaxLayer>
                    <ParallaxLayer offset={3} speed={0.3} />
                </Parallax>
            </div>
        );
    }

    if (!loading && profile === null && !auth.loading && auth.isAuthenticated) {
        return (
            <div>
                <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
                    <Toolbar>
                        <Typography>
                            <span style={{ fontWeight: 700, fontSize: '20px' }}>
                                Portfolio Creator
                            </span>{' '}
                            <span style={{ color: '#3d40d8' }}>
                                | Whoops :(
                            </span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="noProf noProfLarge">
                    No profile found ...
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={navToReg}
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }

    if (!loading && !isAuthenticated && !auth.loading) {
        return <div>u need to be logged in to access this.please login</div>;
    }

    return <div>hello world</div>;
};

Portfolio.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
    profile: PropTypes.oneOfType([PropTypes.object]).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getCurrentProfile: getCurrentProfile_,
})(Portfolio);
