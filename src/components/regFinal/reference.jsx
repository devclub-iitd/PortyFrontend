import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReferenceDetails from './referenceDetailsContainer';

class ReferenceExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      referenceDetailsCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
    };
    const { expanded } = this.state;
    tempFields.push(<ReferenceDetails key={0} id={0} expanded={expanded} action={() => this.handlePanel(`referencePanel${0}`)} moveFieldUp={() => this.moveFieldUp(0)} />);
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
  }

  onAddChild() {
    const { referenceFields } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceDetailsCount } = this.state;
    const { expanded } = this.state;
    const tempFields = referenceFields;
    const tempFieldsTracker = referenceFieldTracker;
    const i = referenceDetailsCount;
    const exp = expanded;
    tempFieldsTracker.push(i);
    tempFields.push(<ReferenceDetails key={i} id={i} expanded={exp} action={() => this.handlePanel(`referencePanel${i}`)} moveFieldUp={() => this.moveFieldUp(i)} />);
    this.setState(state => ({
      referenceDetailsCount: state.referenceDetailsCount + 1,
      btnStyle: {
        display: 'block',
      },
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
    }));
  }

  onSubChild() {
    const { referenceFields } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceDetailsCount } = this.state;
    const tempFields = referenceFields;
    const tempFieldsTracker = referenceFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    this.setState(state => ({
      referenceDetailsCount: state.referenceDetailsCount - 1,
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
    }));
    if (referenceDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = referenceFieldTracker;
      for (let i = 0; i < referenceDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<ReferenceDetails key={k} id={i} expanded={false} action={() => this.handlePanel(`referencePanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: false,
        referenceFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = referenceFieldTracker;
      for (let i = 0; i < referenceDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<ReferenceDetails key={k} id={i} expanded={panel} action={() => this.handlePanel(`referencePanel${i}`)} moveFieldUp={() => this.moveFieldUp(k)} />);
      }
      this.setState({
        expanded: panel,
        referenceFields: tempFields,
      });
    }
  }

  moveFieldUp(k) {
    // alert(k);
    const { expanded } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceFields } = this.state;
    const tempFields = referenceFields;
    const tempFieldsTracker = referenceFieldTracker;
    if (k !== 0) {
      const storeFieldTracker = tempFieldsTracker[k - 1];
      tempFieldsTracker[k - 1] = tempFieldsTracker[k];
      tempFieldsTracker[k] = storeFieldTracker;
      tempFields[k] = <ReferenceDetails key={k - 1} id={k} expanded={expanded} action={() => this.handlePanel(`referencePanel${k}`)} moveFieldUp={() => this.moveFieldUp(k)} />;
      tempFields[k - 1] = <ReferenceDetails key={k} id={k - 1} expanded={expanded} action={() => this.handlePanel(`referencePanel${k - 1}`)} moveFieldUp={() => this.moveFieldUp(k - 1)} />;
    }
    this.setState({
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
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
    const { referenceFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === 'referencePanel'} onChange={action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>References</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Insert Tagline here</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>
                {referenceFields}
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

ReferenceExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default ReferenceExpansionPanel;
