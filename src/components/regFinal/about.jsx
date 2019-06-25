import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '75%',
    margin: 'auto',
    marginTop: '15px',

  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    textTransform: 'uppercase',
    flexShrink: 0,
    fontWeight: 700,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.secondary.main,
  },
}));

function AboutExpansionPanel(props) {
  const classes = useStyles();
  const { expanded } = props;
  const { action } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'aboutPanel'} onChange={action}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>About You</Typography>
          <Typography className={classes.secondaryHeading}>
            <i>Tell us a bit more about yourself</i>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="epDetails">
            <input type="text" required placeholder="Label: Student" />
            <textarea resize="none" placeholder="A brief summary about you ..." />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

AboutExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default AboutExpansionPanel;
