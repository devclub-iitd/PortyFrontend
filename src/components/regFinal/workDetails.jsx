import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 600,
    color: '#3d40d8'
  },
}));

export default function WorkDetails(props) {
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
          <Typography className={classes.heading}>
            Work
            {' '}
            {props.id + 1}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="customDetailContainer">
            <div className="sectionSeperator" />
            <input type="text" name={`work[company][${props.id}]`} required placeholder="Company:" />
            <input type="text" name={`work[position][${props.id}]`} required placeholder="Position:" />
            <input type="text" name={`work[website][${props.id}]`} required placeholder="Website:" />
            <div className="row rowtwo">
              <input className="left" type="text" name={`work[startdate][${props.id}]`} required placeholder="Start Date: DD/MM/YYYY" />
              <input className="right" type="text" name={`work[enddate][${props.id}]`} required placeholder="End Date: DD/MM/YYYY or Ongoing" />
            </div>
            <textarea resize="none" name={`work[summary][${props.id}]`} placeholder="Summary | Highlights : " />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}














//
//
// const WorkDetails = props => (
//   <div>
//     <div className="sectionSeperator" />
//     <input type="text" name={`work[company][${props.id}]`} required placeholder="Company:" />
//     <input type="text" name={`work[position][${props.id}]`} required placeholder="Position:" />
//     <input type="text" name={`work[website][${props.id}]`} required placeholder="Website:" />
//     <div className="row rowtwo">
//       <input className="left" type="text" name={`work[startdate][${props.id}]`} required placeholder="Start Date: DD/MM/YYYY" />
//       <input className="right" type="text" name={`work[enddate][${props.id}]`} required placeholder="End Date: DD/MM/YYYY or Ongoing" />
//     </div>
//     <textarea resize="none" name={`work[summary][${props.id}]`} placeholder="Summary | Highlights : " />
//   </div>
// );
//
// export default WorkDetails;
