import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EducationDetails from './educationDetails';

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

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={props.expanded === 'educationPanel'} onChange={props.action}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Education</Typography>
          <Typography className={classes.secondaryHeading}>
            <i>Insert Tagline here</i>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="customDetailContainer">
            <EducationDetails />
            <div className="addBtn">+</div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
