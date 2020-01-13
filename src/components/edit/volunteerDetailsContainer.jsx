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

const VolunteerField = (props) => {
  const { id } = props;
  const { expanded } = props;
  const { action } = props;
  const { moveFieldUp } = props;
  const { moveFieldDown } = props;
  const { handleChange } = props;
  const { data } = props;
  const [state, setState] = React.useState({
    hidden: data.hidden,
  });

  const handleCheckBoxChange = name => (event) => {
    setState({ ...state, [name]: event.target.checked });
    handleChange(event);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ExpansionPanel expanded={expanded === `volunteerPanel${id}`} onChange={action} style={{ marginTop: '10px', color: '#3d40d8', width: '100%' }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography style={{ fontWeight: 700 }}>
            VOLUNTEERING
            {' '}
            {id + 1}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="customDetailContainer">
            <div className="sectionSeperator" />
            <input value={data.organisation} type="text" onChange={handleChange} id={id} name="organisation" placeholder="Organisation:" />
            <input value={data.position} type="text" onChange={handleChange} id={id} name="position" placeholder="Position:" />
            <input value={data.website} type="text" onChange={handleChange} id={id} name="website" placeholder="Website:" />
            <div className="row rowtwo">
              <input value={data.startdate} className="left" type="text" onChange={handleChange} id={id} name="startdate" placeholder="Start Date: DD/MM/YYYY" />
              <input value={data.enddate} className="right" type="text" onChange={handleChange} id={id} name="enddate" placeholder="End Date: DD/MM/YYYY or Ongoing" />
            </div>
            <textarea value={data.summary} resize="none" onChange={handleChange} id={id} name="summary" placeholder="Summary | Highlights : " />
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

VolunteerField.propTypes = {
  id: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  moveFieldUp: PropTypes.func.isRequired,
  moveFieldDown: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default VolunteerField;
