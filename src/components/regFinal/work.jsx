import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WorkDetails from './workDetails';

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workDetails: 1,
      btnStyle: {
        display: 'none',
      },
    };
    this.onAddChild = this.onAddChild.bind(this);
    this.onSubChild = this.onSubChild.bind(this);
  }

  onAddChild() {
    this.setState((state) => ({
      workDetails: state.workDetails + 1,
      btnStyle: {
        display: 'block',
      },
    }));
  }

  onSubChild() {
    this.setState(state => ({
      workDetails: state.workDetails - 1,
    }));
    if (this.state.workDetails === 2) {
      this.setState({
        btnStyle: {
          display: 'none',
        },
      });
    }
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
    const workDetails = [];
    for (let i = 0; i < this.state.workDetails; i += 1) {
      workDetails.push(<WorkDetails key={i} id={i} />);
    }
    return (
      <div style={useStyles.root}>
        <ExpansionPanel expanded={this.props.expanded === 'workPanel'} onChange={this.props.action}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Work</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Insert Tagline here</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="customDetailContainer">
              {workDetails}
              <div className="btnRow">
                <div className="addBtn" onClick={this.onSubChild} style={this.state.btnStyle}>-</div>
                <div className="addBtn" onClick={this.onAddChild}>+</div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
export default ControlledExpansionPanels;
