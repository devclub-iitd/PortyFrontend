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
      maxCount: 1,
      btnStyle: {
        display: "none"
      },
      expanded: false,
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: [
        {
          language: "",
          fluency: "",
          hidden: false
        }
      ]
    };
    const { expanded } = this.state;
    tempFields.push(
      <LanguageDetails
        handleChange={this.handleInputChange}
        key={0}
        id={0}
        expanded={expanded}
        action={() => this.handlePanel(`languagePanel${0}`)}
        moveFieldDown={() => this.moveFieldDown(0, 0)}
        moveFieldUp={() => this.moveFieldUp(0, 0)}
      />
    );
    tempFieldsTracker.push(0);
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
    this.handlePanel = this.handlePanel.bind(this);
    this.moveFieldUp = this.moveFieldUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onAddChild() {
    const { languageFields } = this.state;
    const { languageFieldTracker } = this.state;
    const { languageDetailsCount, maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = languageFields;
    const tempFieldsTracker = languageFieldTracker;
    const i = languageDetailsCount;
    const key = maxCount;
    const exp = expanded;
    tempFieldsTracker.push(key);
    tempFields.push(
      <LanguageDetails
        handleChange={this.handleInputChange}
        key={key}
        id={i}
        expanded={exp}
        action={() => this.handlePanel(`volunteerPanel${i}`)}
        moveFieldDown={() => this.moveFieldDown(key, i)}
        moveFieldUp={() => this.moveFieldUp(key, i)}
      />
    );

    const { language } = this.state;
    const languageObj = {
      language: "",
      fluency: "",
      hidden: false
    };
    const templanguage = language;
    templanguage.push(languageObj);
    this.setState(state => ({
      languageDetailsCount: state.languageDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: "block"
      },
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage
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
      language: templanguage
    }));
    if (languageDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: "none"
        }
      });
    }
  }

  callApiRequest() {
    this.props.senData("language", this.state.language);
  }

  componentDidMount() {
    // console.log(this.props)
    this.setState({
      language: [...this.state.language, ...this.props.existingData]
    });
    // console.log(this.state)
  }

  handleInputChange(event) {
    const { id } = event.target;
    const { language } = this.state;
    const type = event.target.name;
    const templanguage = language;
    if (type === "hidden") {
      templanguage[id][type] = event.target.checked;
    } else {
      templanguage[id][type] = event.target.value;
    }
    console.log(templanguage);
    this.setState({
      language: templanguage
    });
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
        tempFields.push(
          <LanguageDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={false}
            action={() => this.handlePanel(`languagePanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: false,
        languageFields: tempFields
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = languageFieldTracker;
      for (let i = 0; i < languageDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <LanguageDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={panel}
            action={() => this.handlePanel(`languagePanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: panel,
        languageFields: tempFields
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
      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <LanguageDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`languagePanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i - 1] = (
        <LanguageDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i - 1}
          expanded={expanded}
          action={() => this.handlePanel(`languagePanel${i - 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i - 1)}
          moveFieldUp={() => this.moveFieldUp(k, i - 1)}
        />
      );

      const tempstore = templanguage[i];
      templanguage[i] = templanguage[i - 1];
      templanguage[i - 1] = tempstore;
    } else {
      alert("you cant move this field any more");
    }
    this.setState({
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage
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
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <LanguageDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`languagePanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i + 1] = (
        <LanguageDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i + 1}
          expanded={expanded}
          action={() => this.handlePanel(`languagePanel${i + 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i + 1)}
          moveFieldUp={() => this.moveFieldUp(k, i + 1)}
        />
      );

      const tempstore = templanguage[i];
      templanguage[i] = templanguage[i + 1];
      templanguage[i + 1] = tempstore;
    } else {
      alert("you cant move this field any more");
    }
    this.setState({
      languageFields: tempFields,
      languageFieldTracker: tempFieldsTracker,
      language: templanguage
    });
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "rgba(255,255,255,1)"
        },
        secondary: {
          main: "#3d40d8"
        }
      }
    });
    const useStyles = {
      root: {
        width: "75%",
        margin: "auto",
        marginTop: "15px"
      },
      heading: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: "33.33%",
        textTransform: "uppercase",
        flexShrink: 0,
        fontWeight: 700
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.secondary.main
      }
    };
    const { expanded } = this.props;
    const { action } = this.props;
    const { languageFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel
          expanded={expanded === "languagePanel"}
          onChange={action}
        >
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
              <div>{languageFields}</div>
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

LanguageExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default LanguageExpansionPanel;
