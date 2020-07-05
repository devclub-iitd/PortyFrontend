import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const ExpansionCard = (props) => {
    const {
        organisation,
        position,
        children,
        website,
        startDate,
        endDate,
        handlePanelChange,
        expanded,
        id,
    } = props;

    return (
        <ExpansionPanel
            expanded={expanded === `panel${id}`}
            onChange={() => handlePanelChange(`panel${id}`)}
            className="portfolioVolunteerExpansionPanel"
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <div className="portfolioExpansionPanelTitle">
                    {organisation}
                </div>
                <Typography className="portfolioExpansionPanelSubTitle">
                    {position}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="portfolioExpansionPanelDetails">
                    <Typography>{children}</Typography>
                    <div className="miniLine miniCardLine" />
                    <div className="portfolioExpansionPanelWebsite">
                        <span>Website |</span>{' '}
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Link to page
                        </a>
                    </div>
                    <div className="portfolioCardDateContainer">
                        {startDate} | {endDate}
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

ExpansionCard.propTypes = {
    organisation: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    handlePanelChange: PropTypes.func.isRequired,
    expanded: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default ExpansionCard;
