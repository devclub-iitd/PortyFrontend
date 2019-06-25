import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AwardDetails from './awardDetailsContainer';

class AwardExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      awardDetailsCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
    };
    const { expanded } = this.state;
    tempFields.push(<AwardDetails key={0} id={0} expanded={expanded} action={() => this.handlePanel(`awardPanel${0}`)} moveFieldUp={() => this.moveFieldUp(0)} />);
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
  }

  onAddChild() {
    const { awardFields } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardDetailsCount } = this.state;
    const { expanded } = this.state;
    const tempFields = awardFields;
    const tempFieldsTracker = awardFieldTracker;
    const i = awardDetailsCount;
    const exp = expanded;
    tempFieldsTracker.push(i);
    tempFields.push(<AwardDetails key={i} id={i} expanded={exp} action={() => this.handlePanel(`awardPanel${i}`)} moveFieldUp={() => this.moveFieldUp(i)} />);
    this.setState(state => ({
      awardDetailsCount: state.awardDetailsCount + 1,
      btnStyle: {
        display: 'block',
      },
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
    }));
  }

  onSubChild() {
    const { awardFields } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardDetailsCount } = this.state;
    const tempFields = awardFields;
    const tempFieldsTracker = awardFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    this.setState(state => ({
      awardDetailsCount: state.awardDetailsCount - 1,
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
    }));
    if (awardDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = awardFieldTracker;
      for (let i = 0; i < awardDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<AwardDetails key={k} id={i} expanded={false} action={() => this.handlePanel(`awardPanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: false,
        awardFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = awardFieldTracker;
      for (let i = 0; i < awardDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<AwardDetails key={k} id={i} expanded={panel} action={() => this.handlePanel(`awardPanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: panel,
        awardFields: tempFields,
      });
    }
  }

  moveFieldUp(k) {
    // alert(k);
    const { expanded } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardFields } = this.state;
    const tempFields = awardFields;
    const tempFieldsTracker = awardFieldTracker;
    if (k !== 0) {
      const storeFieldTracker = tempFieldsTracker[k - 1];
      tempFieldsTracker[k - 1] = tempFieldsTracker[k];
      tempFieldsTracker[k] = storeFieldTracker;
      tempFields[k] = <AwardDetails key={k - 1} id={k} expanded={expanded} action={() => this.handlePanel(`awardPanel${k}`)} moveFieldUp={() => this.moveFieldUp(k)} />;
      tempFields[k - 1] = <AwardDetails key={k} id={k - 1} expanded={expanded} action={() => this.handlePanel(`awardPanel${k - 1}`)} moveFieldUp={() => this.moveFieldUp(k - 1)} />;
    }
    this.setState({
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
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
    const { awardFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === 'awardPanel'} onChange={action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Awards</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Insert Tagline here</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>
                {awardFields}
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

AwardExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default AwardExpansionPanel;
