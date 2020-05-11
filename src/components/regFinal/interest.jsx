import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InterestDetails from './interestDetailsContainer';

class InterestExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const tempFields = [];
    const tempFieldsTracker = [];
    this.state = {
      interestDetailsCount: 1,
      maxCount: 1,
      btnStyle: {
        display: 'none',
      },
      expanded: false,
      interestFields: tempFields,
      interestFieldTracker: tempFieldsTracker,
      interest: [
        {
          name: '',
          keywords: '',
          hidden: false,
        },
      ],
    };
    const { expanded } = this.state;
    tempFields.push(
      <InterestDetails
        handleChange={this.handleInputChange}
        key={0}
        id={0}
        expanded={expanded}
        action={() => this.handlePanel(`interestPanel${0}`)}
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
    const { interestFields } = this.state;
    const { interestFieldTracker } = this.state;
    const { interestDetailsCount, maxCount } = this.state;
    const { expanded } = this.state;
    const tempFields = interestFields;
    const tempFieldsTracker = interestFieldTracker;
    const i = interestDetailsCount;
    const key = maxCount;
    const exp = expanded;
    tempFieldsTracker.push(key);
    tempFields.push(
      <InterestDetails
        handleChange={this.handleInputChange}
        key={key}
        id={i}
        expanded={exp}
        action={() => this.handlePanel(`volunteerPanel${i}`)}
        moveFieldDown={() => this.moveFieldDown(key, i)}
        moveFieldUp={() => this.moveFieldUp(key, i)}
      />
    );

    const { interest } = this.state;
    const interestObj = {
      name: '',
      keywords: '',
      hidden: false,
    };
    const tempinterest = interest;
    tempinterest.push(interestObj);
    this.setState((state) => ({
      interestDetailsCount: state.interestDetailsCount + 1,
      maxCount: state.maxCount + 1,
      btnStyle: {
        display: 'block',
      },
      interestFields: tempFields,
      interestFieldTracker: tempFieldsTracker,
      interest: tempinterest,
    }));
  }

  onSubChild() {
    const { interestFields } = this.state;
    const { interestFieldTracker } = this.state;
    const { interestDetailsCount } = this.state;
    const tempFields = interestFields;
    const tempFieldsTracker = interestFieldTracker;
    tempFieldsTracker.pop();
    tempFields.pop();
    const { interest } = this.state;
    const tempinterest = interest;
    tempinterest.pop();
    this.setState((state) => ({
      interestDetailsCount: state.interestDetailsCount - 1,
      interestFields: tempFields,
      interestFieldTracker: tempFieldsTracker,
      interest: tempinterest,
    }));
    if (interestDetailsCount === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
  }

  callApiRequest() {
    this.props.senData('interests', this.state.interest);
  }

  handleInputChange(event) {
    const { id } = event.target;
    const { interest } = this.state;
    const type = event.target.name;
    const tempinterest = interest;
    if (type === 'hidden') {
      tempinterest[id][type] = event.target.checked;
    } else {
      tempinterest[id][type] = event.target.value;
    }
    console.log(tempinterest);
    this.setState({
      interest: tempinterest,
    });
  }

  handlePanel(panel) {
    const { expanded } = this.state;
    const { interestFieldTracker } = this.state;
    const { interestDetailsCount } = this.state;
    if (expanded === panel) {
      const tempFields = [];
      const tempFieldsTracker = interestFieldTracker;
      for (let i = 0; i < interestDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <InterestDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={false}
            action={() => this.handlePanel(`interestPanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: false,
        interestFields: tempFields,
      });
    } else {
      const tempFields = [];
      const tempFieldsTracker = interestFieldTracker;
      for (let i = 0; i < interestDetailsCount; i += 1) {
        const k = tempFieldsTracker[i];
        tempFields.push(
          <InterestDetails
            handleChange={this.handleInputChange}
            key={k}
            id={i}
            expanded={panel}
            action={() => this.handlePanel(`interestPanel${i}`)}
            moveFieldDown={() => this.moveFieldDown(k, i)}
            moveFieldUp={() => this.moveFieldUp(k, i)}
          />
        );
      }
      this.setState({
        expanded: panel,
        interestFields: tempFields,
      });
    }
  }

  moveFieldUp(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { interestFieldTracker } = this.state;
    const { interestFields } = this.state;
    const tempFields = interestFields;
    const tempFieldsTracker = interestFieldTracker;
    const { interest } = this.state;
    const tempinterest = interest;
    if (i !== 0) {
      const storeFieldTracker = tempFieldsTracker[i - 1];
      tempFieldsTracker[i - 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <InterestDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`interestPanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i - 1] = (
        <InterestDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i - 1}
          expanded={expanded}
          action={() => this.handlePanel(`interestPanel${i - 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i - 1)}
          moveFieldUp={() => this.moveFieldUp(k, i - 1)}
        />
      );

      const tempstore = tempinterest[i];
      tempinterest[i] = tempinterest[i - 1];
      tempinterest[i - 1] = tempstore;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      interestFields: tempFields,
      interestFieldTracker: tempFieldsTracker,
      interest: tempinterest,
    });
  }

  moveFieldDown(k, i) {
    // alert(k);
    const { expanded } = this.state;
    const { interestFieldTracker } = this.state;
    const { interestFields } = this.state;
    const { interestDetailsCount } = this.state;
    const tempFields = interestFields;
    const tempFieldsTracker = interestFieldTracker;
    const { interest } = this.state;
    const tempinterest = interest;
    if (i !== interestDetailsCount - 1) {
      const storeFieldTracker = tempFieldsTracker[i + 1];
      tempFieldsTracker[i + 1] = tempFieldsTracker[i];
      tempFieldsTracker[i] = storeFieldTracker;
      tempFields[i] = (
        <InterestDetails
          handleChange={this.handleInputChange}
          key={storeFieldTracker}
          id={i}
          expanded={expanded}
          action={() => this.handlePanel(`interestPanel${i}`)}
          moveFieldDown={() => this.moveFieldDown(storeFieldTracker, i)}
          moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
        />
      );
      tempFields[i + 1] = (
        <InterestDetails
          handleChange={this.handleInputChange}
          key={k}
          id={i + 1}
          expanded={expanded}
          action={() => this.handlePanel(`interestPanel${i + 1}`)}
          moveFieldDown={() => this.moveFieldDown(k, i + 1)}
          moveFieldUp={() => this.moveFieldUp(k, i + 1)}
        />
      );

      const tempstore = tempinterest[i];
      tempinterest[i] = tempinterest[i + 1];
      tempinterest[i + 1] = tempstore;
    } else {
      alert('you cant move this field any more');
    }
    this.setState({
      interestFields: tempFields,
      interestFieldTracker: tempFieldsTracker,
      interest: tempinterest,
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
    const { interestFields } = this.state;
    const { btnStyle } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel
          expanded={expanded === 'interestPanel'}
          onChange={action}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Interests</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Share your interests</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              <div>{interestFields}</div>
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

InterestExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default InterestExpansionPanel;
