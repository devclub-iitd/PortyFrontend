/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Typography } from '@material-ui/core';

import '../style/confirmation.css';

const Confirmation = (props) => {
    const { title, text, handleClose, confirmation, redirectUrl } = props;
    const [checked, setChecked] = useState(false);
    const [reminder, setReminder] = useState(false);
    const checkboxRef = React.createRef();
    const handleCheckBox = (e) => {
        setChecked(e.target.checked);
    };
    let actionButtons;
    const handleConfirmation = () => {
        if (checked) {
            window.location.href = redirectUrl;
        } else {
            setReminder(true);
        }
    };
    if (confirmation) {
        actionButtons = (
            <div
                style={{
                    width: '100%',
                }}
            >
                <button
                    type="button"
                    className="confirmationBtn"
                    onClick={() => handleClose(false)}
                    autoFocus
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="confirmationBtn confirmationBtnDanger"
                    onClick={handleConfirmation}
                    style={{
                        marginLeft: '15px',
                    }}
                    autoFocus
                >
                    Confirm
                </button>
            </div>
        );
    } else {
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
    }
    let checkboxBody;
    if (confirmation) {
        checkboxBody = (
            <Typography
                variant="caption"
                style={{
                    marginTop: '15px',
                }}
            >
                <Checkbox
                    checked={checked}
                    onChange={handleCheckBox}
                    ref={checkboxRef}
                    inputProps={{ 'aria-label': 'checkbox' }}
                />
                Check the box to proceed with confirmation
            </Typography>
        );
    }
    let checkboxReminder;
    if (reminder) {
        checkboxReminder = (
            <Typography
                variant="body"
                style={{
                    textAlign: 'left',
                    marginLeft: '3px',
                    marginTop: '4px',
                    color: '#3d40d8',
                    display: 'block',
                }}
            >
                <i>Whoops!! You have not checked the box!</i>
            </Typography>
        );
    }
    return (
        <div className="confirmationRootContainer">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                exit={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.2 }}
                className="confirmationBackgroundOverlay"
                onClick={() => {
                    if (!confirmation) {
                        handleClose(false);
                    }
                }}
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
                    {checkboxBody}
                    {checkboxReminder}
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
    text: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    confirmation: PropTypes.bool,
};

Confirmation.defaultProps = {
    title: 'Alert',
    confirmation: false,
};

export default Confirmation;
