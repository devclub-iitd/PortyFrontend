import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/alert.css';

const alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alertItem) => (
        <span
            key={alertItem.id}
            id={alertItem.id}
            className={`alert alert-${alertItem.alertType}`}
        >
            {alertItem.msg} hello
        </span>
    ));

alert.propTypes = {
    alerts: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(alert);
