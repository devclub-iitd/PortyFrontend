import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

const Landing = (props) => {
    const { name, label } = props;
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 769) {
            setIsDesktop(true);
            setIsMobile(false);
        } else {
            setIsMobile(true);
            setIsDesktop(false);
        }
    }, []);
    return (
        <div className="portfolioPage1">
            <section id="hero" className="jumbotron">
                <Container>
                    <Fade
                        left={isDesktop}
                        bottom={isMobile}
                        duration={1000}
                        delay={500}
                        distance="30px"
                    >
                        <h1 className="hero-title">
                            {'Hi, my name is'}{' '}
                            <span className="text-color-main">
                                {name || 'Your Name'}
                            </span>
                            <br />
                            {label || "I'm the Unknown Developer."}
                        </h1>
                    </Fade>
                    <Fade
                        left={isDesktop}
                        bottom={isMobile}
                        duration={1000}
                        delay={1000}
                        distance="30px"
                    >
                        <p className="hero-cta">
                            <a className="cta-btn cta-btn--hero" href="#about">
                                {'Learn More'}
                            </a>
                        </p>
                    </Fade>
                </Container>
            </section>
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
