import React from 'react';
import PropTypes from 'prop-types';

const Intro = (props) => {
    const { name } = props;
    return (
        <div className="introContainer introContainerEdit">
            <div className="pageTitle">Welcome, {name}</div>
        </div>
    );
};

Intro.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Intro;
