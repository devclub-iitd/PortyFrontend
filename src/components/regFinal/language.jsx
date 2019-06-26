import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageDetails from './languageDetailsContainer';

class LanguageExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      languageDetailsCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
    };
    const { expanded } = this.state;
    tempFields.push(<LanguageDetails key={0} id={0} expanded={expanded} action={() => this.handlePanel(`languagePanel${0}`)} moveFieldDown={() => this.moveFieldDown(0, 0)} moveFieldUp={() => this.moveFieldUp(0, 0)} />);
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
  }

  onAddChild() {
    const { languageFields } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageDetailsCount } = this.state;
    const { expanded } = this.state;
    const tempFields = languageFields;
    const tempFieldsTracker = languageFieldTracker;
    const i = languageDetailsCount;
    const exp = expanded;
    tempFieldsTracker.push(i);
    tempFields.push(<LanguageDetails key={i} id={i} expanded={exp} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(i, i)} moveFieldUp={() => this.moveFieldUp(i, i)} />);
    this.setState(state => ({
      languageDetailsCount: state.languageDetailsCount + 1,
      btnStyle: {
        display: 'block',
      },
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
    }));
  }

  onSubChild() {
    const { languageFields } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageDetailsCount } = this.state;
    const tempFields = languageFields;
    const tempFieldsTracker = languageFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    this.setState(state => ({
      languageDetailsCount: state.languageDetailsCount - 1,
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
    }));
    if (languageDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = languageFieldTracker;
      for (let i = 0; i < languageDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<LanguageDetails key={k} id={i} expanded={false} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
      }
      this.setState({
        expanded: false,
        languageFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = languageFieldTracker;
      for (let i = 0; i < languageDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<LanguageDetails key={k} id={i} expanded={panel} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
      }
      this.setState({
        expanded: panel,
        languageFields: tempFields,
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageFields } = this.state;
    const tempFields = languageFields;
    const tempFieldsTracker = languageFieldTracker;
    if (i !== 0) {
      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <LanguageDetails key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i - 1] = <LanguageDetails key={k} id={i - 1} expanded={expanded} action={() => this.handlePanel(`languagePanel${i - 1}`)} moveFieldDown={() => this.moveFieldDown(k, i - 1)} moveFieldUp={() => this.moveFieldUp(k, i - 1)} />;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageFields } = this.state;
    const { languageDetailsCount } = this.state;
    const tempFields = languageFields;
    const tempFieldsTracker = languageFieldTracker;
    if (i !== languageDetailsCount - 1) {
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <LanguageDetails key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i + 1] = <LanguageDetails key={k} id={i + 1} expanded={expanded} action={() => this.handlePanel(`languagePanel${i + 1}`)} moveFieldDown={() => this.moveFieldDown(k, i + 1)} moveFieldUp={() => this.moveFieldUp(k, i + 1)} />;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
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
    const { languageFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === 'languagePanel'} onChange={action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Languages</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Insert Tagline here</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>
                {languageFields}
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

LanguageExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default LanguageExpansionPanel;
