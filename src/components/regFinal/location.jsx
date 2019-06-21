import React from 'react';
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

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Location</Typography>
          <Typography className={classes.secondaryHeading}>
            <i>Insert tagline here</i>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form>
            <input type="text" required placeholder="Address Line 1:" />
            <input type="text" required placeholder="Address Line 2:" />
            <div className="row">
              <input className="rowInputThree" type="text" required placeholder="City | State :" />
              <input className="rowInputThree" type="text" required placeholder="Pincode:" />
              <input className="rowInputThree" type="text" required placeholder="Country:" />
            </div>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
