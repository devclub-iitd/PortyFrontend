import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const EducationField = (props) => {
  const { id } = props;
  const { expanded } = props;
  const { action } = props;
  const { moveFieldUp } = props;
  const { moveFieldDown } = props;
  const { handleChange } = props;
  const [state, setState] = React.useState({
    hidden: false,
  });

  const handleCheckBoxChange = name => (event) => {
    setState({ ...state, [name]: event.target.checked });
    handleChange(event);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ExpansionPanel expanded={expanded === `educationPanel${id}`} onChange={action} style={{ marginTop: '10px', color: '#3d40d8', width: '100%' }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography style={{ fontWeight: 700 }}>
            EDUCATIONPLACE
            {' '}
            {id + 1}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="customDetailContainer">
            <div className="sectionSeperator" />
            <input id={id} onChange={handleChange} name="institution" type="text" required placeholder="Institution:" />
            <div className="row rowtwo">
              <input id={id} onChange={handleChange} name="area" className="left" type="text" required placeholder="Area: Software Development" />
              <input id={id} onChange={handleChange} name="qualification" className="right" type="text" required placeholder="Qualification: Bachelors | Masters | etc" />
            </div>
            <div className="row rowtwo">
              <input id={id} onChange={handleChange} name="startdate" className="left" type="text" required placeholder="Start Date: DD/MM/YYYY" />
              <input id={id} onChange={handleChange} name="enddate" className="right" type="text" required placeholder="End Date: DD/MM/YYYY or Ongoing" />
            </div>
            <input id={id} onChange={handleChange} name="gpa" type="text" required placeholder="GPA: xx/10" />
            <textarea id={id} onChange={handleChange} name="details" resize="none" placeholder="Details | Courses : " />
            <div style={{ marginLeft: '2px', marginTop: '15px' }}>
              <FormControlLabel
                control={
                  <Checkbox id={id} name="hidden" checked={state.hidden} onChange={handleCheckBoxChange('hidden')} value="hidden" />
                }
                label="Hidden"
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div className="sideBtnCont">
        <ButtonGroup color="secondary" aria-label="Outlined primary button group" size="small">
          <IconButton color="primary" aria-label="Move Field Up" onClick={moveFieldUp}>
            <ArrowUp />
          </IconButton>
          <IconButton color="primary" aria-label="Move Field Down" onClick={moveFieldDown}>
            <ArrowDown />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

EducationField.propTypes = {
  id: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  moveFieldUp: PropTypes.func.isRequired,
  moveFieldDown: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EducationField;
