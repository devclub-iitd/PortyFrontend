import React from 'react';
import Fade from 'react-reveal/Fade';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Title from './Title';

const Contact = (props) => {
    const { email, phone, location } = props;

    return (
        <section id="contact">
            <Container>
                <Title title="Contact" />
                <Fade bottom duration={1000} delay={800} distance="30px">
                    <div className="contact-wrapper">
                        <p className="contact-wrapper__text">
                            Would you like to work with me? Awesome!
                        </p>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-btn cta-btn--resume"
                            href={
                                email
                                    ? `mailto:${email}`
                                    : 'https://github.com/cobidev/react-simplefolio'
                            }
                        >
                            Email
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-btn cta-btn--resume"
                            href={
                                phone
                                    ? `callto:${phone}`
                                    : 'https://github.com/cobidev/react-simplefolio'
                            }
                        >
                            Call
                        </a>
                        <div className="portfolioContactCard">
                            <div className="portfolioContactCardAddress">
                                <span>{location.addressline1}</span>
                                <br />
                                <span>{location.addressline2}</span>
                                <br />
                                {location.city}
                                <br />
                                {location.country} | {location.pincode}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Container>
        </section>
        //   <div className="portfolioPage contactPage">
        //       <div className="portfolioPageTitle">Contact Me</div>
        //       <div className="portfolioContactCard">
        //           <div className="miniLine" />
        //           <li>
        //               <span className="portfolioContactCardInfo">
        //                   <span className="portfolioContactCardInfoTitle">
        //                       Email ID -
        //                   </span>{' '}
        //                   <span className="portfolioContactCardInfoDetails">
        //                       {email}
        //                   </span>
        //               </span>
        //           </li>
        //           <li>
        //               <span className="portfolioContactCardInfo">
        //                   <span className="portfolioContactCardInfoTitle">
        //                       Contact No -
        //                   </span>{' '}
        //                   <span className="portfolioContactCardInfoDetails">
        //                       {phone}
        //                   </span>
        //               </span>
        //           </li>
        //           <div className="miniLine" />
        //       </div>
        //       <div className="portfolioContactCard">
        //           <div className="miniLine" />
        //           <div className="portfolioContactCardAddress">
        //               <span>{location.addressline1}</span>
        //               <br />
        //               <span>{location.addressline2}</span>
        //               <br />
        //               {location.city}
        //               <br />
        //               {location.country} | {location.pincode}
        //           </div>
        //           <div className="miniLine" />
        //       </div>
        //       {/* <div className="portfolioContactCard portfolioContactSocialCard">
        //   <span>insert social icons with clickable links</span>
        // </div> */}
        //   </div>
    );
};

Contact.propTypes = {
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Contact;
