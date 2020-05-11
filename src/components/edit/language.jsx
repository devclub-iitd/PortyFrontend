/* eslint-disable no-alert */
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
    const { existingData } = this.props;
    const tempFields = [];
    const tempFieldsTracker = [];
    let btnDisp = 'none';
    if (existingData.length > 1) {
      btnDisp = 'block';
    }
    this.state = {
      languageDetailsCount: existingData.length,
      maxCount: existingData.length,
      btnStyle: {
        display: btnDisp,
      },
      expanded: false,
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: existingData,
    };
    const { expanded } = this.state;
    for (let i = 0; i < existingData.length; i += 1) {
      tempFields.push(<LanguageDetails data={existingData[i]} handleChange={this.handleInputChange} key={i} id={i} expanded={expanded} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(i, i)} moveFieldUp={() => this.moveFieldUp(i, i)} />);
      tempFieldsTracker.push(i);
    }
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onAddChild() {
    const { languageFields } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageDetailsCount } = this.state;
    const { maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = languageFields;
    const tempFieldsTracker = languageFieldTracker;
    const id = languageDetailsCount;
    const key = maxCount;
    const exp = expanded;
    const { language } = this.state;
    const languageObj = {
      language: '',
      fluency: '',
      hidden: false,
    };
    tempFieldsTracker.push(key);
    tempFields.push(<LanguageDetails data={languageObj} handleChange={this.handleInputChange} key={key} id={id} expanded={exp} action={() => this.handlePanel(`languagePanel${id}`)} moveFieldDown={() => this.moveFieldDown(key, id)} moveFieldUp={() => this.moveFieldUp(key, id)} />);
    const templanguage = language;
    templanguage.push(languageObj);
    this.setState(state => ({
      languageDetailsCount: state.languageDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: 'block',
      },
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage,
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
    const { language } = this.state;
    const templanguage = language;
    templanguage.pop();
    this.setState(state => ({
      languageDetailsCount: state.languageDetailsCount - 1,
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage,
    }));
    if (languageDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  callApiRequest() {
    const { language } = this.state;
    const { senData } = this.props;
    senData('languages', language);
  }

  handleInputChange(event) {
    const { id } = event.target;
    const {
      language, languageFieldTracker, languageDetailsCount, expanded,
    } = this.state;
    const type = event.target.name;
    const tempFields = [];
    const tempFieldsTracker = languageFieldTracker;
    const templanguage = language;
    if (type === 'hidden') {
      templanguage[id][type] = event.target.checked;
    } else {
      templanguage[id][type] = event.target.value;
    }
    for (let i = 0; i < languageDetailsCount; i += 1) {
      const k = tempFieldsTracker[i];
      tempFields.push(<LanguageDetails data={templanguage[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={expanded} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
    }
    this.setState({
      language: templanguage,
      languageFields: tempFields,
    });
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageDetailsCount } = this.state;
    const { language } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = languageFieldTracker;
      for (let i = 0; i < languageDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(<LanguageDetails data={language[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={false} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
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
        tempFields.push(<LanguageDetails data={language[i]} handleChange={this.handleInputChange} key={k} id={i} expanded={panel} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(k, i)} moveFieldUp={() => this.moveFieldUp(k, i)} />);
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
    const { language } = this.state;
    const templanguage = language;
    if (i !== 0) {
      const tempstore = templanguage[i];
      templanguage[i] = templanguage[i - 1];
      templanguage[i - 1] = tempstore;

      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <LanguageDetails data={templanguage[i]} handleChange={this.handleInputChange} key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i - 1] = <LanguageDetails data={templanguage[i - 1]} handleChange={this.handleInputChange} key={k} id={i - 1} expanded={expanded} action={() => this.handlePanel(`languagePanel${i - 1}`)} moveFieldDown={() => this.moveFieldDown(k, i - 1)} moveFieldUp={() => this.moveFieldUp(k, i - 1)} />;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage,
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
    const { language } = this.state;
    const templanguage = language;
    if (i !== languageDetailsCount - 1) {
      const tempstore = templanguage[i];
      templanguage[i] = templanguage[i + 1];
      templanguage[i + 1] = tempstore;
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = <LanguageDetails data={templanguage[i]} handleChange={this.handleInputChange} key={storeFieldTracker} id={i} expanded={expanded} action={() => this.handlePanel(`languagePanel${i}`)} moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)} moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)} />;
      tempFields[i + 1] = <LanguageDetails data={templanguage[i + 1]} handleChange={this.handleInputChange} key={k} id={i + 1} expanded={expanded} action={() => this.handlePanel(`languagePanel${i + 1}`)} moveFieldDown={() => this.moveFieldDown(k, i + 1)} moveFieldUp={() => this.moveFieldUp(k, i + 1)} />;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage,
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
            <Typography style={useStyles.heading}>Language</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>What languages do you speak (or coding languages)</i>
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
  senData: PropTypes.func.isRequired,
  existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LanguageExpansionPanel;
