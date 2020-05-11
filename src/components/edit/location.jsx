import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class LocationExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    const {
      existingData,
    } = this.props;
    this.state = {
      addressline1: existingData.addressline1,
      addressline2: existingData.addressline2,
      city: existingData.city,
      pincode: existingData.pincode,
      country: existingData.country,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  callApiRequest() {
    const { senData } = this.props;
    senData('location', this.state);
  }

  handleInputChange(event) {
    const type = event.target.name;
    this.setState({
      [type]: event.target.value,
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
    const {
      addressline1, addressline2, city, pincode, country,
    } = this.state;
    return (
      <div style={useStyles.root}>
        <ExpansionPanel
          expanded={expanded === 'locationPanel'}
          onChange={action}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={useStyles.heading}>Location</Typography>
            <Typography style={useStyles.secondaryHeading}>
              <i>Where are you currently situated</i>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="epDetails">
              <input
                value={addressline1}
                onChange={this.handleInputChange}
                name="addressline1"
                type="text"
                required
                placeholder="Address Line 1:"
              />
              <input
                value={addressline2}
                onChange={this.handleInputChange}
                name="addressline2"
                type="text"
                required
                placeholder="Address Line 2:"
              />
              <div className="row">
                <input
                  value={city}
                  onChange={this.handleInputChange}
                  name="city"
                  className="rowInputThree"
                  type="text"
                  required
                  placeholder="City | State :"
                />
                <input
                  value={pincode}
                  onChange={this.handleInputChange}
                  name="pincode"
                  className="rowInputThree"
                  type="text"
                  required
                  placeholder="Pincode:"
                />
                <input
                  value={country}
                  onChange={this.handleInputChange}
                  name="country"
                  className="rowInputThree"
                  type="text"
                  required
                  placeholder="Country:"
                />
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

LocationExpansionPanel.propTypes = {
  expanded: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  senData: PropTypes.func.isRequired,
  existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LocationExpansionPanel;
