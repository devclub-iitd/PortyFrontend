import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
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
                    <Title title="Education" />
                    <Row key="1">
                        <Col lg={4} sm={12}>
                            <Fade
                                left={isDesktop}
                                bottom={isMobile}
                                duration={1000}
                                delay={500}
                                distance="30px"
                            ></Fade>
                        </Col>
                        <Col lg={8} sm={12}>
                            <Fade
                                right={isDesktop}
                                bottom={isMobile}
                                duration={1000}
                                delay={1000}
                                distance="30px"
                            >
                                <div className="portfolioFlatContainer">
                                    {education.map((educationPlace) => (
                                        <FlatCard
                                            institution={
                                                educationPlace.institution
                                            }
                                            degree={
                                                educationPlace.qualification
                                            }
                                            area={educationPlace.area}
                                            grade={educationPlace.gpa}
                                            startDate={educationPlace.startdate}
                                            endDate={educationPlace.enddate}
                                        >
                                            {educationPlace.details}
                                        </FlatCard>
                                    ))}
                                </div>
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
