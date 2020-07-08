/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { Typography } from '@material-ui/core';

import { regenerateOtp as regenerateOtp_ } from '../actions/auth';

import '../style/confirmation.css';

const Confirmation = (props) => {
    const { title, text, handleClose, login, userEmail, regenerateOtp } = props;
    let actionButtons;
    if (!login) {
        actionButtons = (
            <button
                type="button"
                className="confirmationBtn"
                onClick={() => handleClose(false)}
                autoFocus
            >
                Okay!
            </button>
        );
    } else {
        actionButtons = (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                    type="button"
                    className="confirmationBtn"
                    onClick={() => handleClose(false)}
                    autoFocus
                >
                    Cancel
                </button>
                <div style={{ padding: '0px 10px' }} />
                <button
                    type="button"
                    className="confirmationBtn"
                    onClick={() => {
                        regenerateOtp(userEmail);
                    }}
                >
                    Resend Link
                </button>
            </div>
        );
    }
    return (
        <div className="confirmationRootContainer">
            <motion.div
                initial={{
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                }}
                exit={{
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                }}
                animate={{
                    opacity: 1,
                    backdropFilter: 'blur(5px)',
                }}
                transition={{ duration: 0.2 }}
                className="confirmationBackgroundOverlay"
                onClick={() => handleClose(false)}
            />
            <motion.div
                initial={{ scale: 1, opacity: 0, y: 10 }}
                exit={{ scale: 1, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                    duration: 0.2,
                }}
                className="confirmationContentContainer"
            >
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="confirmationTitleContainer"
                >
                    <Typography
                        variant="h5"
                        style={{
                            fontWeight: 600,
                            marginRight: 'auto',
                            textAlign: 'left',
                        }}
                    >
                        {title}
                    </Typography>
                </motion.div>
                <div className="confirmationMiniLine" />
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="confirmationDetailContainer"
                >
                    <Typography
                        variant="body2"
                        style={{
                            marginRight: 'auto',
                            textAlign: 'left',
                        }}
                    >
                        {text}
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="confirmationActionArea"
                >
                    {actionButtons}
                </motion.div>
            </motion.div>
        </div>
    );
};

Confirmation.propTypes = {
    title: PropTypes.string,
    userEmail: PropTypes.string,
    text: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    regenerateOtp: PropTypes.func.isRequired,
    login: PropTypes.bool,
};

Confirmation.defaultProps = {
    title: 'Alert',
    userEmail: '',
    login: false,
};

export default connect(null, { regenerateOtp: regenerateOtp_ })(Confirmation);
