import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SkillDetails from './skillDetailsContainer';

class SkillExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      skillDetailsCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      skillFields: tempFields,
      skillFieldTracker: tempFieldsTracker,
    };
    const { expanded } = this.state;
    tempFields.push(<SkillDetails key={0} id={0} expanded={expanded} action={() => this.handlePanel(`skillPanel${0}`)} moveFieldUp={() => this.moveFieldUp(0)} />);
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
  }

  onAddChild() {
    const { skillFields } = this.state;
    const { skillFieldTracker } = this.state;
    const { skillDetailsCount } = this.state;
    const { expanded } = this.state;
    const tempFields = skillFields;
    const tempFieldsTracker = skillFieldTracker;
    const i = skillDetailsCount;
    const exp = expanded;
    tempFieldsTracker.push(i);
    tempFields.push(<SkillDetails key={i} id={i} expanded={exp} action={() => this.handlePanel(`skillPanel${i}`)} moveFieldUp={() => this.moveFieldUp(i)} />);
    this.setState(state => ({
      skillDetailsCount: state.skillDetailsCount + 1,
      btnStyle: {
        display: 'block',
      },
      skillFields: tempFields,
      skillFieldTracker: tempFieldsTracker,
    }));
  }

  onSubChild() {
    const { skillFields } = this.state;
    const { skillFieldTracker } = this.state;
    const { skillDetailsCount } = this.state;
    const tempFields = skillFields;
    const tempFieldsTracker = skillFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    this.setState(state => ({
      skillDetailsCount: state.skillDetailsCount - 1,
      skillFields: tempFields,
      skillFieldTracker: tempFieldsTracker,
    }));
    if (skillDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { skillFieldTracker } = this.state;
    const { skillDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = skillFieldTracker;
      for (let i = 0; i < skillDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<SkillDetails key={k} id={i} expanded={false} action={() => this.handlePanel(`skillPanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: false,
        skillFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = skillFieldTracker;
      for (let i = 0; i < skillDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<SkillDetails key={k} id={i} expanded={panel} action={() => this.handlePanel(`skillPanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: panel,
        skillFields: tempFields,
      });
    }
  }

  moveFieldUp(k) {
    // alert(k);
    const { expanded } = this.state;
    const { skillFieldTracker } = this.state;
    const { skillFields } = this.state;
    const tempFields = skillFields;
    const tempFieldsTracker = skillFieldTracker;
    if (k !== 0) {
      const storeFieldTracker = tempFieldsTracker[k - 1];
      tempFieldsTracker[k - 1] = tempFieldsTracker[k];
      tempFieldsTracker[k] = storeFieldTracker;
      tempFields[k] = <SkillDetails key={k - 1} id={k} expanded={expanded} action={() => this.handlePanel(`skillPanel${k}`)} moveFieldUp={() => this.moveFieldUp(k)} />;
      tempFields[k - 1] = <SkillDetails key={k} id={k - 1} expanded={expanded} action={() => this.handlePanel(`skillPanel${k - 1}`)} moveFieldUp={() => this.moveFieldUp(k - 1)} />;
    }
    this.setState({
      skillFields: tempFields,
      skillFieldTracker: tempFieldsTracker,
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
    const { skillFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === 'skillPanel'} onChange={action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Skills</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Insert Tagline here</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>
                {skillFields}
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

SkillExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default SkillExpansionPanel;
