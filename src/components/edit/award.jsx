import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AwardDetails from "./awardDetailsContainer";

class AwardExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      awardDetailsCount: 1,
      maxCount: 1,
      btnStyle: {
        display: "none"
      },
      expanded: false,
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
      award: [
        {
          title: "",
          date: "",
          awarder: "",
          details: "",
          hidden: false
        }
      ]
    };
    const { expanded } = this.state;
    tempFields.push(
      <AwardDetails
        handleChange={this.handleInputChange}
        key={0}
        id={0}
        expanded={expanded}
        action={() => this.handlePanel(`awardPanel${0}`)}
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
    const { awardFields } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardDetailsCount, maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = awardFields;
    const tempFieldsTracker = awardFieldTracker;
    const i = awardDetailsCount;
    const key = maxCount;
    const exp = expanded;
    tempFieldsTracker.push(key);
    tempFields.push(
      <AwardDetails
        handleChange={this.handleInputChange}
        key={key}
        id={i}
        expanded={exp}
        action={() => this.handlePanel(`volunteerPanel${i}`)}
        moveFieldDown={() => this.moveFieldDown(key, i)}
        moveFieldUp={() => this.moveFieldUp(key, i)}
      />
    );

    const { award } = this.state;
    const awardObj = {
      title: "",
      date: "",
      awarder: "",
      details: "",
      hidden: false
    };
    const tempaward = award;
    tempaward.push(awardObj);
    this.setState(state => ({
      awardDetailsCount: state.awardDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: "block"
      },
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
      award: tempaward
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
    const { award } = this.state;
    const tempaward = award;
    tempaward.pop();
    this.setState(state => ({
      awardDetailsCount: state.awardDetailsCount - 1,
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
      award: tempaward
    }));
    if (awardDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: "none"
        }
      });
    }
  }

  callApiRequest() {
    this.props.senData("award", this.state.award);
  }

  componentDidMount() {
    console.log(this.props);
    this.setState((state , props) => ({
      award: [...this.state.award, ...this.props.existingData]
    }));
    // console.log(this.state)
  }

  handleInputChange(event) {
    const { id } = event.target;
    const { award } = this.state;
    const type = event.target.name;
    const tempaward = award;
    if (type === "hidden") {
      tempaward[id][type] = event.target.checked;
    } else {
      tempaward[id][type] = event.target.value;
    }
    this.setState({
      award: tempaward
    });
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
        tempFields.push(
          <AwardDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={false}
            action={() => this.handlePanel(`awardPanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: false,
        awardFields: tempFields
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = awardFieldTracker;
      for (let i = 0; i < awardDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <AwardDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={panel}
            action={() => this.handlePanel(`awardPanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: panel,
        awardFields: tempFields
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardFields } = this.state;
    const tempFields = awardFields;
    const tempFieldsTracker = awardFieldTracker;
    const { award } = this.state;
    const tempaward = award;
    if (i !== 0) {
      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <AwardDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`awardPanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i - 1] = (
        <AwardDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i - 1}
          expanded={expanded}
          action={() => this.handlePanel(`awardPanel${i - 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i - 1)}
          moveFieldUp={() => this.moveFieldUp(k, i - 1)}
        />
      );

      const tempstore = tempaward[i];
      tempaward[i] = tempaward[i - 1];
      tempaward[i - 1] = tempstore;
    } else {
      alert("you cant move this field any more");
    }
    this.setState({
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
      award: tempaward
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { awardFieldTracker } = this.state;
    const { awardFields } = this.state;
    const { awardDetailsCount } = this.state;
    const tempFields = awardFields;
    const tempFieldsTracker = awardFieldTracker;
    const { award } = this.state;
    const tempaward = award;
    if (i !== awardDetailsCount - 1) {
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <AwardDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`awardPanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i + 1] = (
        <AwardDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i + 1}
          expanded={expanded}
          action={() => this.handlePanel(`awardPanel${i + 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i + 1)}
          moveFieldUp={() => this.moveFieldUp(k, i + 1)}
        />
      );

      const tempstore = tempaward[i];
      tempaward[i] = tempaward[i + 1];
      tempaward[i + 1] = tempstore;
    } else {
      alert("you cant move this field any more");
    }
    this.setState({
      awardFields: tempFields,
      awardFieldTracker: tempFieldsTracker,
      award: tempaward
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
    const { awardFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={expanded === "awardPanel"} onChange={action}>
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
              <div>{awardFields}</div>
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

AwardExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default AwardExpansionPanel;
