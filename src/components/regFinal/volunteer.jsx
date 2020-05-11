/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VolunteerDetails from './volunteerDetailsContainer';

class VolunteerExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      volunteerDetailsCount: 1,
      maxCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      volunteerFields: tempFields,
      volunteerFieldTracker: tempFieldsTracker,
      volunteer: [
        {
          organisation: '',
          position: '',
          website: '',
          startdate: '',
          enddate: '',
          summary: '',
          hidden: false,
        },
      ],
    };
    const { expanded } = this.state;
    tempFields.push(
      <VolunteerDetails
        handleChange={this.handleInputChange}
        key={0}
        id={0}
        expanded={expanded}
        action={() => this.handlePanel(`volunteerPanel${0}`)}
        moveFieldDown={() => this.moveFieldDown(0, 0)}
        moveFieldUp={() => this.moveFieldUp(0, 0)}
      />,
    );
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onAddChild() {
    const { volunteerFields } = this.state;
    const { volunteerFieldTracker } = this.state;
    const { volunteerDetailsCount, maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = volunteerFields;
    const tempFieldsTracker = volunteerFieldTracker;
    const i = volunteerDetailsCount;
    const key = maxCount;
    const exp = expanded;
    tempFieldsTracker.push(key);
    tempFields.push(
      <VolunteerDetails
        handleChange={this.handleInputChange}
        key={key}
        id={i}
        expanded={exp}
        action={() => this.handlePanel(`volunteerPanel${i}`)}
        moveFieldDown={() => this.moveFieldDown(key, i)}
        moveFieldUp={() => this.moveFieldUp(key, i)}
      />,
    );
    const { volunteer } = this.state;
    const volunteerObj = {
      organisation: '',
      position: '',
      website: '',
      startdate: '',
      enddate: '',
      summary: '',
      hidden: false,
    };
    const tempvolunteer = volunteer;
    tempvolunteer.push(volunteerObj);
    this.setState(state => ({
      volunteerDetailsCount: state.volunteerDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: 'block',
      },
      volunteerFields: tempFields,
      volunteerFieldTracker: tempFieldsTracker,
      volunteer: tempvolunteer,
    }));
  }

  onSubChild() {
    const { volunteerFields } = this.state;
    const { volunteerFieldTracker } = this.state;
    const { volunteerDetailsCount } = this.state;
    const tempFields = volunteerFields;
    const tempFieldsTracker = volunteerFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    const { volunteer } = this.state;
    const tempvolunteer = volunteer;
    tempvolunteer.pop();
    this.setState(state => ({
      volunteerDetailsCount: state.volunteerDetailsCount - 1,
      volunteerFields: tempFields,
      volunteerFieldTracker: tempFieldsTracker,
      volunteer: tempvolunteer,
    }));
    if (volunteerDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  callApiRequest() {
    const { volunteer } = this.state;
    const { senData } = this.props;
    senData('volunteer', volunteer);
  }

  handleInputChange(event) {
    const { id } = event.target;
    const { volunteer } = this.state;
    const type = event.target.name;
    const tempvolunteer = volunteer;
    if (type === 'hidden') {
      tempvolunteer[id][type] = event.target.checked;
    } else {
      tempvolunteer[id][type] = event.target.value;
    }
    this.setState({
      volunteer: tempvolunteer,
    });
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { volunteerFieldTracker } = this.state;
    const { volunteerDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = volunteerFieldTracker;
      for (let i = 0; i < volunteerDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <VolunteerDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={false}
            action={() => this.handlePanel(`volunteerPanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />,
        );
      }
      this.setState({
        expanded: false,
        volunteerFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = volunteerFieldTracker;
      for (let i = 0; i < volunteerDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <VolunteerDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={panel}
            action={() => this.handlePanel(`volunteerPanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />,
        );
      }
      this.setState({
        expanded: panel,
        volunteerFields: tempFields,
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { volunteerFieldTracker } = this.state;
    const { volunteerFields } = this.state;
    const tempFields = volunteerFields;
    const tempFieldsTracker = volunteerFieldTracker;
    const { volunteer } = this.state;
    const tempvolunteer = volunteer;
    if (i !== 0) {
      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <VolunteerDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`volunteerPanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i - 1] = (
        <VolunteerDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i - 1}
          expanded={expanded}
          action={() => this.handlePanel(`volunteerPanel${i - 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i - 1)}
          moveFieldUp={() => this.moveFieldUp(k, i - 1)}
        />
      );

      const tempstore = tempvolunteer[i];
      tempvolunteer[i] = tempvolunteer[i - 1];
      tempvolunteer[i - 1] = tempstore;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      volunteerFields: tempFields,
      volunteerFieldTracker: tempFieldsTracker,
      volunteer: tempvolunteer,
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { volunteerFieldTracker } = this.state;
    const { volunteerFields } = this.state;
    const { volunteerDetailsCount } = this.state;
    const tempFields = volunteerFields;
    const tempFieldsTracker = volunteerFieldTracker;
    const { volunteer } = this.state;
    const tempvolunteer = volunteer;
    if (i !== volunteerDetailsCount - 1) {
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <VolunteerDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`volunteerPanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i + 1] = (
        <VolunteerDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i + 1}
          expanded={expanded}
          action={() => this.handlePanel(`volunteerPanel${i + 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i + 1)}
          moveFieldUp={() => this.moveFieldUp(k, i + 1)}
        />
      );

      const tempstore = tempvolunteer[i];
      tempvolunteer[i] = tempvolunteer[i + 1];
      tempvolunteer[i + 1] = tempstore;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      volunteerFields: tempFields,
      volunteerFieldTracker: tempFieldsTracker,
      volunteer: tempvolunteer,
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
    const { volunteerFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel
          expanded={expanded === 'volunteerPanel'}
          onChange={action}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Volunteer</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Volunteering activities | PORs | Other roles | Etc.</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>{volunteerFields}</div>
              <div className="btnRow">
                <div
                  className="addBtn"
                  onClick={this.onSubChild}
                  style={btnStyle}
                  role="presentation"
                >
                  -
                </div>
                <div
                  className="addBtn"
                  onClick={this.onAddChild}
                  role="presentation"
                >
                  +
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

VolunteerExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  senData: PropTypes.func.isRequired,
};

export default VolunteerExpansionPanel;
