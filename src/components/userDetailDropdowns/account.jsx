import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class AccountExpansionPanel extends React.Component {
    constructor(props) {
        super(props);
        const { mode } = this.props;
        if (mode === 'register') {
            this.state = {
                name: '',
                email: '',
            };
        } else if (mode === 'edit') {
            const { existingData } = this.props;
            this.state = {
                name: existingData.name,
                email: existingData.email,
            };
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    callApiRequest() {
        const { senData } = this.props;
        senData('user', this.state);
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
        const { name, email } = this.state;
        return (
            <div style={useStyles.root}>
                <ExpansionPanel
                    expanded={expanded === 'accountPanel'}
                    onChange={action}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography style={useStyles.heading}>
                            Account
                        </Typography>
                        <Typography style={useStyles.secondaryHeading}>
                            <i>
                                Fill out some primary details about your account
                            </i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="epDetails">
                            <input
                                value={name}
                                name="name"
                                onChange={this.handleInputChange}
                                type="text"
                                required
                                placeholder="Full Name: "
                            />
                            <input
                                value={email}
                                name="email"
                                onChange={this.handleInputChange}
                                type="email"
                                required
                                placeholder="Email ID: To be displayed on portfolio "
                            />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

AccountExpansionPanel.propTypes = {
    expanded: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    existingData: PropTypes.oneOfType([PropTypes.object]),
};

AccountExpansionPanel.defaultProps = {
    existingData: {},
};

export default AccountExpansionPanel;
