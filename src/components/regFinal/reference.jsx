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
      maxCount: 1,
      btnStyle: {
        display: "none"
      },
      expanded: false,
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
      reference: [
        {
          name: "",
          reference: "",
          hidden: false
        }
      ]
    };
    const { expanded } = this.state;
    tempFields.push(
      <ReferenceDetails
        handleChange={this.handleInputChange}
        key={0}
        id={0}
        expanded={expanded}
        action={() => this.handlePanel(`referencePanel${0}`)}
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
    const { referenceFields } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceDetailsCount } = this.state;
    const { maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = referenceFields;
    const tempFieldsTracker = referenceFieldTracker;
    const id = referenceDetailsCount;
    const key = maxCount;
    const exp = expanded;
    tempFieldsTracker.push(key);
    tempFields.push(
      <ReferenceDetails
        handleChange={this.handleInputChange}
        key={key}
        id={id}
        expanded={exp}
        action={() => this.handlePanel(`referencePanel${id}`)}
        moveFieldDown={() => this.moveFieldDown(key, id)}
        moveFieldUp={() => this.moveFieldUp(key, id)}
      />
    );
    const { reference } = this.state;
    const referenceObj = {
      name: "",
      reference: "",
      hidden: false
    };
    const tempreference = reference;
    tempreference.push(referenceObj);
    this.setState(state => ({
      referenceDetailsCount: state.referenceDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: "block"
      },
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
      reference: tempreference
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
    const { reference } = this.state;
    const tempreference = reference;
    tempreference.pop();
    this.setState(state => ({
      referenceDetailsCount: state.referenceDetailsCount - 1,
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
      reference: tempreference
    }));
    if (referenceDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: "none"
        }
      });
    }
  }

  callApiRequest() {
    this.props.senData("references", this.state.reference);
  }

  handleInputChange(event) {
    const { id } = event.target;
    const { reference } = this.state;
    const type = event.target.name;
    const tempreference = reference;
    if (type === "hidden") {
      tempreference[id][type] = event.target.checked;
    } else {
      tempreference[id][type] = event.target.value;
    }
    this.setState({
      reference: tempreference
    });
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
        tempFields.push(
          <ReferenceDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={false}
            action={() => this.handlePanel(`referencePanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: false,
        referenceFields: tempFields
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = referenceFieldTracker;
      for (let i = 0; i < referenceDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <ReferenceDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={panel}
            action={() => this.handlePanel(`referencePanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: panel,
        referenceFields: tempFields
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceFields } = this.state;
    const tempFields = referenceFields;
    const tempFieldsTracker = referenceFieldTracker;
    const { reference } = this.state;
    const tempreference = reference;
    if (i !== 0) {
      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <ReferenceDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`referencePanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i - 1] = (
        <ReferenceDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i - 1}
          expanded={expanded}
          action={() => this.handlePanel(`referencePanel${i - 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i - 1)}
          moveFieldUp={() => this.moveFieldUp(k, i - 1)}
        />
      );

      const tempstore = tempreference[i];
      tempreference[i] = tempreference[i - 1];
      tempreference[i - 1] = tempstore;
    } else {
      alert("you cant move this field any more");
    }
    this.setState({
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
      reference: tempreference
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { referenceFieldTracker } = this.state;
    const { referenceFields } = this.state;
    const { referenceDetailsCount } = this.state;
    const tempFields = referenceFields;
    const tempFieldsTracker = referenceFieldTracker;
    const { reference } = this.state;
    const tempreference = reference;
    if (i !== referenceDetailsCount - 1) {
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <ReferenceDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`referencePanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i + 1] = (
        <ReferenceDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i + 1}
          expanded={expanded}
          action={() => this.handlePanel(`referencePanel${i + 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i + 1)}
          moveFieldUp={() => this.moveFieldUp(k, i + 1)}
        />
      );

      const tempstore = tempreference[i];
      tempreference[i] = tempreference[i + 1];
      tempreference[i + 1] = tempstore;
    } else {
      alert("you cant move this field any more");
    }
    this.setState({
      referenceFields: tempFields,
      referenceFieldTracker: tempFieldsTracker,
      reference: tempreference
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
    const { referenceFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel
          expanded={expanded === "referencePanel"}
          onChange={action}
        >
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
              <div>{referenceFields}</div>
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

ReferenceExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default ReferenceExpansionPanel;
