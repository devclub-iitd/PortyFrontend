import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Title from './Title';

const About = (props) => {
    const { summary, img } = props;
    const about = summary.summary;
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
        <section id="about">
            <Container>
                <Title title="About Me" className="about-title" />
                <Row className="about-wrapper">
                    <Col md={6} sm={12}>
                        <Fade
                            bottom
                            duration={1000}
                            delay={600}
                            distance="30px"
                        >
                            <div className="about-wrapper__image">
                                <img
                                    alt="profile"
                                    src={img}
                                    className="img-profile"
                                />
                            </div>
                        </Fade>
                    </Col>
                    <Col md={6} sm={12}>
                        <Fade
                            left={isDesktop}
                            bottom={isMobile}
                            duration={1000}
                            delay={1000}
                            distance="30px"
                        >
                            <div className="about-wrapper__info">
                                <p className="about-wrapper__info-text">
                                    {about}
                                </p>
                            </div>
                        </Fade>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

About.propTypes = {
    summary: PropTypes.oneOfType([PropTypes.object]).isRequired,
    img: PropTypes.string.isRequired,
};

export default About;
