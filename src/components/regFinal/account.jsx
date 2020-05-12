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
        this.state = {
            password: '',
            confirmPassword: '',
            passwordHint: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    callApiRequest() {
        // eslint-disable-next-line no-alert
        alert('account');
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
        const { password, confirmPassword, passwordHint } = this.state;
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
                            <i>help us keep your account secure</i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="epDetails">
                            <div className="row rowtwo">
                                <input
                                    value={password}
                                    name="password"
                                    onChange={this.handleInputChange}
                                    className="left"
                                    type="password"
                                    required
                                    placeholder="Password: "
                                />
                                <input
                                    value={confirmPassword}
                                    name="confirmPassword"
                                    onChange={this.handleInputChange}
                                    className="right"
                                    type="password"
                                    required
                                    placeholder="Confirm Password: "
                                />
                            </div>
                            <input
                                value={passwordHint}
                                name="passwordHint"
                                onChange={this.handleInputChange}
                                type="text"
                                required
                                placeholder="Password Hint: To help you remember incase you forget"
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
};

export default AccountExpansionPanel;
