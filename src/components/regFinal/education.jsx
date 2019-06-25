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
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      educationDetailsCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
    };
    const { expanded } = this.state;
    tempFields.push(<EducationDetails key={0} id={0} expanded={expanded} action={() => this.handlePanel(`educationPanel${0}`)} moveFieldUp={() => this.moveFieldUp(0)} />);
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
  }

  onAddChild() {
    const { educationFields } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationDetailsCount } = this.state;
    const { expanded } = this.state;
    const tempFields = educationFields;
    const tempFieldsTracker = educationFieldTracker;
    const i = educationDetailsCount;
    const exp = expanded;
    tempFieldsTracker.push(i);
    tempFields.push(<EducationDetails key={i} id={i} expanded={exp} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldUp={() => this.moveFieldUp(i)} />);
    this.setState(state => ({
      educationDetailsCount: state.educationDetailsCount + 1,
      btnStyle: {
        display: 'block',
      },
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
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
    this.setState(state => ({
      educationDetailsCount: state.educationDetailsCount - 1,
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
    }));
    if (educationDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = educationFieldTracker;
      for (let i = 0; i < educationDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<EducationDetails key={k} id={i} expanded={false} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
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
        tempFields.push(<EducationDetails key={k} id={i} expanded={panel} action={() => this.handlePanel(`educationPanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: panel,
        educationFields: tempFields,
      });
    }
  }

  moveFieldUp(k) {
    // alert(k);
    const { expanded } = this.state;
    const { educationFieldTracker } = this.state;
    const { educationFields } = this.state;
    const tempFields = educationFields;
    const tempFieldsTracker = educationFieldTracker;
    if (k !== 0) {
      const storeFieldTracker = tempFieldsTracker[k - 1];
      tempFieldsTracker[k - 1] = tempFieldsTracker[k];
      tempFieldsTracker[k] = storeFieldTracker;
      tempFields[k] = <EducationDetails key={k - 1} id={k} expanded={expanded} action={() => this.handlePanel(`educationPanel${k}`)} moveFieldUp={() => this.moveFieldUp(k)} />;
      tempFields[k - 1] = <EducationDetails key={k} id={k - 1} expanded={expanded} action={() => this.handlePanel(`educationPanel${k - 1}`)} moveFieldUp={() => this.moveFieldUp(k - 1)} />;
    }
    this.setState({
      educationFields: tempFields,
      educationFieldTracker: tempFieldsTracker,
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
              <i>Insert Tagline here</i>
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
};

export default EducationExpansionPanel;
