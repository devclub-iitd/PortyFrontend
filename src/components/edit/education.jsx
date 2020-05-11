/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EducationDetails from './educationDetailsContainer';


class EducationExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const { existingData } = this.props;
    const tempFields = [];
    const tempFieldsTracker = [];
    let btnDisp = 'none';
    if (existingData.length > 1) {
      btnDisp = 'block';
    }
    this.state = {
      educationDetailsCount: existingData.length,
      maxCount: existingData.length,
      btnStyle: {
        display: btnDisp,
      },
      expanded: false,
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
      education: existingData,
    };
    const { expanded } = this.state;
    for (let i = 0; i < existingData.length; i += 1) {
      tempFields.push(<EducationDetails data={existingData[i]} handleChange={this.handleInputChange} key={i} id={i} expanded={expanded} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldDown={() => this.moveFieldDown(i, i)} moveFieldUp={() => this.moveFieldUp(i, i)} />);
      tempFieldsTracker.push(i);
    }
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onAddChild() {
    const { educationFields } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationDetailsCount } = this.state;
    const { maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = educationFields;
    const tempFieldsTracker = educationFieldTracker;
    const id = educationDetailsCount;
    const key = maxCount;
    const exp = expanded;
    const { education } = this.state;
    const educationObj = {
      institution: '',
      area: '',
      qualification: '',
      startdate: '',
      enddate: '',
      gpa: '',
      details: '',
      hidden: false,
    };
    tempFieldsTracker.push(key);
    tempFields.push(<EducationDetails data={educationObj} handleChange={this.handleInputChange} key={key} id={id} expanded={exp} action={() => this.handlePanel(`educationPanel${id}`)} moveFieldDown={() => this.moveFieldDown(key, id)} moveFieldUp={() => this.moveFieldUp(key, id)} />);
    const tempeducation = education;
    tempeducation.push(educationObj);
    this.setState(state => ({
      educationDetailsCount: state.educationDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: 'block',
      },
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
      education: tempeducation,
    }));
  }

  onSubChild() {
    const { educationFields } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationDetailsCount } = this.state;
    const tempFields = educationFields;
    const tempFieldsTracker = educationFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    const { education } = this.state;
    const tempeducation = education;
    tempeducation.pop();
    this.setState(state => ({
      educationDetailsCount: state.educationDetailsCount - 1,
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
      education: tempeducation,
    }));
    if (educationDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  callApiRequest() {
    const { education } = this.state;
    const { senData } = this.props;
    senData('education', education);
  }

  handleInputChange(event) {
    const { id } = event.target;
    const {
      education, educationFieldTracker, educationDetailsCount, expanded,
    } = this.state;
    const type = event.target.name;
    const tempFields = [];
    const tempFieldsTracker = educationFieldTracker;
    const tempeducation = education;
    if (type === 'hidden') {
      tempeducation[id][type] = event.target.checked;
    } else {
      tempeducation[id][type] = event.target.value;
    }
    for (let i = 0; i < educationDetailsCount; i += 1) {
      const k = tempFieldsTracker[i];
      tempFields.push(<EducationDetails data={tempeducation[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={expanded} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
    }
    this.setState({
      education: tempeducation,
      educationFields: tempFields,
    });
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationDetailsCount } = this.state;
    const { education } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = educationFieldTracker;
      for (let i = 0; i < educationDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<EducationDetails data={education[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={false} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
      }
      this.setState({
        expanded: false,
        educationFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = educationFieldTracker;
      for (let i = 0; i < educationDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<EducationDetails data={education[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={panel} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
      }
      this.setState({
        expanded: panel,
        educationFields: tempFields,
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationFields } = this.state;
    const tempFields = educationFields;
    const tempFieldsTracker = educationFieldTracker;
    const { education } = this.state;
    const tempeducation = education;
    if (i !== 0) {
      const tempstore = tempeducation[i];
      tempeducation[i] = tempeducation[i - 1];
      tempeducation[i - 1] = tempstore;

      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <EducationDetails data={tempeducation[i]} handleChange={this.handleInputChange} key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i - 1] = <EducationDetails data={tempeducation[i - 1]} handleChange={this.handleInputChange} key={k} id={i - 1} expanded={expanded} action={() => this.handlePanel(`educationPanel${i - 1}`)} moveFieldDown={() => this.moveFieldDown(k, i - 1)} moveFieldUp={() => this.moveFieldUp(k, i - 1)} />;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
      education: tempeducation,
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationFields } = this.state;
    const { educationDetailsCount } = this.state;
    const tempFields = educationFields;
    const tempFieldsTracker = educationFieldTracker;
    const { education } = this.state;
    const tempeducation = education;
    if (i !== educationDetailsCount - 1) {
      const tempstore = tempeducation[i];
      tempeducation[i] = tempeducation[i + 1];
      tempeducation[i + 1] = tempstore;
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <EducationDetails data={tempeducation[i]} handleChange={this.handleInputChange} key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i + 1] = <EducationDetails data={tempeducation[i + 1]} handleChange={this.handleInputChange} key={k} id={i + 1} expanded={expanded} action={() => this.handlePanel(`educationPanel${i + 1}`)} moveFieldDown={() => this.moveFieldDown(k, i + 1)} moveFieldUp={() => this.moveFieldUp(k, i + 1)} />;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
      education: tempeducation,
    });
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: 'rgba(255,255,255,1)',
        },
        secondary: {
          main: '#3d40d8',
        },
      },
    });
    const useStyles = {
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
    };
    const { expanded } = this.props;
    const { action } = this.props;
    const { educationFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === 'educationPanel'} onChange={action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Education</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Educational qualifications</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>
                {educationFields}
              </div>
              <div className="btnRow">
                <div className="addBtn" onClick={this.onSubChild} style={btnStyle} role="presentation">-</div>
                <div className="addBtn" onClick={this.onAddChild} role="presentation">+</div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

EducationExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  senData: PropTypes.func.isRequired,
  existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EducationExpansionPanel;
