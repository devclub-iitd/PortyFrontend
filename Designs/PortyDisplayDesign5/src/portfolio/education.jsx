import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import { Container, Row, Col } from 'react-bootstrap';
import Title from './Title';
import PropTypes from 'prop-types';
import FlatCard from './cards/flat';

const Education = (props) => {
    const { education } = props;
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
      <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="INFO" />
              <Row key="1">
                <Col lg={4} sm={12}>
                  <Fade
                    left={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={500}
                    distance="30px"
                  >
                    <div className="project-wrapper__text">
                      <h3 className="project-wrapper__text-title">{'EDUCATION'}</h3>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn cta-btn--hero"
                        href={'#!'}
                      >
                        See Live
                      </a>
                    </div>
                  </Fade>
                </Col>
                <Col lg={8} sm={12}>
                  <Fade
                    right={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={1000}
                    distance="30px"
                  >
                    <div className="project-wrapper__image">
                      <a
                        href={'#!'}
                        target="_blank"
                        aria-label="Project Link"
                        rel="noopener noreferrer"
                      >

                      </a>
                    </div>
                    {education.map((educationPlace) => (
                                 <FlatCard
                                  institution={educationPlace.institution}
                                     degree={educationPlace.qualification}
                                    area={educationPlace.area}
                                     grade={educationPlace.gpa}
                                     startDate={educationPlace.startdate}
                                     endDate={educationPlace.enddate}
                                  className="eduCard"
                                >
                                    {educationPlace.details}
                                </FlatCard>
                            ))}
                  </Fade>
                </Col>
              </Row>
        </div>
      </Container>
    </section>
    );
};

Education.propTypes = {
    education: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Education;
