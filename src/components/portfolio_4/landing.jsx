import React from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';

const Landing = (props) => {
    const { name, label, img, initScroll } = props;
    let userImage;
    if (img.trim().length > 0) {
        userImage = (
            <img className="portfolioUserImage" src={img} alt="Broken URL" />
        );
    }
    return (
        <div className="portfolioPage1">
            <Particles
                className="particles-bg"
                params={{
                    particles: {
                        number: {
                            value: 200,
                            density: {
                                enable: true,
                            },
                        },
                        size: {
                            value: 5,
                            random: true,
                            anim: {
                                speed: 4,
                                size_min: 0.3,
                            },
                        },
                        line_linked: {
                            enable: true,
                        },
                        move: {
                            random: true,
                            speed: 1,
                            direction: 'top',
                            out_mode: 'out',
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'bubble',
                            },
                            onclick: {
                                enable: true,
                                mode: 'repulse',
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 250,
                                duration: 2,
                                size: 0,
                                opacity: 0,
                            },
                            repulse: {
                                distance: 400,
                                duration: 4,
                            },
                        },
                    },
                }}
            />
            <div className="portfolioPage1Details">
                {userImage}
                <div className="portfolioUserDetails">
                    <span className="portfolioUserName">{name}</span>{' '}
                    <span className="portfolioUserLabel">| {label}</span>
                    <div className="miniLine" />
                </div>
            </div>
            <div className="portfolioPage1SocialHolder">
                <div
                    className="portfolioBtn"
                    onClick={initScroll}
                    onKeyPress={initScroll}
                    role="button"
                    tabIndex={0}
                >
                    Learn More
                </div>
            </div>
        </div>
    );
};

Landing.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    initScroll: PropTypes.func.isRequired,
};

export default Landing;
