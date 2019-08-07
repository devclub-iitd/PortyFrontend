import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WorkDetails from './workDetailsContainer';
import {createProfile} from '../../actions/profile'


class WorkExpansionPanel extends React.Component {
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
      workDetailsCount: existingData.length,
      maxCount: existingData.length,
      btnStyle: {
        display: btnDisp,
      },
      expanded: false,
      workFields: tempFields,
      workFieldTracker: tempFieldsTracker,
      work: existingData,
    };
    const { expanded } = this.state;
    for (let i = 0; i < existingData.length; i += 1) {
      tempFields.push(<WorkDetails data={existingData[0]} handleChange={this.handleInputChange} key={i} id={i} expanded={expanded} action={() => this.handlePanel(`workPanel${i}`)} moveFieldDown={() => this.moveFieldDown(i, i)} moveFieldUp={() => this.moveFieldUp(i, i)} />);
      tempFieldsTracker.push(i);
    }
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onAddChild() {
    const { workFields } = this.state;
    const { workFieldTracker } = this.state;
    const { workDetailsCount } = this.state;
    const { maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = workFields;
    const tempFieldsTracker = workFieldTracker;
    const id = workDetailsCount;
    const key = maxCount;
    const exp = expanded;
    const { work } = this.state;
    const workObj = {
      company: '',
      position: '',
      website: '',
      startdate: '',
      enddate: '',
      summary: '',
      hidden: false,
    };
    tempFieldsTracker.push(key);
    tempFields.push(<WorkDetails data={workObj} handleChange={this.handleInputChange} key={key} id={id} expanded={exp} action={() => this.handlePanel(`workPanel${id}`)} moveFieldDown={() => this.moveFieldDown(key, id)} moveFieldUp={() => this.moveFieldUp(key, id)} />);
    const tempwork = work;
    tempwork.push(workObj);
    this.setState(state => ({
      workDetailsCount: state.workDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: 'block',
      },
      workFields: tempFields,
      workFieldTracker: tempFieldsTracker,
      work: tempwork,
    }));
  }

  onSubChild() {
    const { workFields } = this.state;
    const { workFieldTracker } = this.state;
    const { workDetailsCount } = this.state;
    const tempFields = workFields;
    const tempFieldsTracker = workFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    const { work } = this.state;
    const tempwork = work;
    tempwork.pop();
    this.setState(state => ({
      workDetailsCount: state.workDetailsCount - 1,
      workFields: tempFields,
      workFieldTracker: tempFieldsTracker,
      work: tempwork,
    }));
    if (workDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  callApiRequest() {
    this.props.senData('work', this.state.work);
  }

  handleInputChange(event) {
    const { id } = event.target;
    const { work, workFieldTracker, workDetailsCount, expanded } = this.state;
    const type = event.target.name;
    const tempFields = [];
    const tempFieldsTracker = workFieldTracker;
    const tempwork = work;
    if (type === 'hidden') {
      tempwork[id][type] = event.target.checked;
    } else {
      tempwork[id][type] = event.target.value;
    }
    for (let i = 0; i < workDetailsCount; i += 1) {
      const k = tempFieldsTracker[i];
      tempFields.push(<WorkDetails data={tempwork[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={expanded} action={() => this.handlePanel(`workPanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
    }
    this.setState({
      work: tempwork,
      workFields: tempFields,
    });
    console.log(tempwork);
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { workFieldTracker } = this.state;
    const { workDetailsCount } = this.state;
    const { work } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = workFieldTracker;
      for (let i = 0; i < workDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<WorkDetails data={work[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={false} action={() => this.handlePanel(`workPanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
      }
      this.setState({
        expanded: false,
        workFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = workFieldTracker;
      for (let i = 0; i < workDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<WorkDetails data={work[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={panel} action={() => this.handlePanel(`workPanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
      }
      this.setState({
        expanded: panel,
        workFields: tempFields,
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { workFieldTracker } = this.state;
    const { workFields } = this.state;
    const tempFields = workFields;
    const tempFieldsTracker = workFieldTracker;
    const { work } = this.state;
    const tempwork = work;
    if (i !== 0) {
      const tempstore = tempwork[i];
      tempwork[i] = tempwork[i - 1];
      tempwork[i - 1] = tempstore;

      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <WorkDetails data={tempwork[i]} handleChange={this.handleInputChange} key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`workPanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i - 1] = <WorkDetails data={tempwork[i - 1]} handleChange={this.handleInputChange} key={k} id={i - 1} expanded={expanded} action={() => this.handlePanel(`workPanel${i - 1}`)} moveFieldDown={() => this.moveFieldDown(k, i - 1)} moveFieldUp={() => this.moveFieldUp(k, i - 1)} />;

    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      workFields: tempFields,
      workFieldTracker: tempFieldsTracker,
      work: tempwork,
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { workFieldTracker } = this.state;
    const { workFields } = this.state;
    const { workDetailsCount } = this.state;
    const tempFields = workFields;
    const tempFieldsTracker = workFieldTracker;
    const { work } = this.state;
    const tempwork = work;
    if (i !== workDetailsCount - 1) {
      const tempstore = tempwork[i];
      tempwork[i] = tempwork[i + 1];
      tempwork[i + 1] = tempstore;
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <WorkDetails data={tempwork[i]} handleChange={this.handleInputChange} key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`workPanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i + 1] = <WorkDetails data={tempwork[i + 1]} handleChange={this.handleInputChange} key={k} id={i + 1} expanded={expanded} action={() => this.handlePanel(`workPanel${i + 1}`)} moveFieldDown={() => this.moveFieldDown(k, i + 1)} moveFieldUp={() => this.moveFieldUp(k, i + 1)} />;

    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      workFields: tempFields,
      workFieldTracker: tempFieldsTracker,
      work: tempwork,
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
    const { workFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === 'workPanel'} onChange={action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Work</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Insert Tagline here</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>
                {workFields}
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

WorkExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default WorkExpansionPanel
