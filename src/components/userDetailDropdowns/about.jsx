import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class AboutExpansionPanel extends React.Component {
    constructor(props) {
        super(props);
        const { existingContactData, existingData, mode } = this.props;
        if (mode === 'edit') {
            this.state = {
                name: existingContactData.name,
                number: existingData.number,
                label: existingData.label,
                summary: existingData.summary,
                imgUrl: existingData.imgUrl,
            };
        }
        if (mode === 'register') {
            this.state = {
                label: '',
                imgUrl: '',
                summary: '',
                number: '',
            };
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    callApiRequest() {
        const { senData } = this.props;
        senData('about', this.state);
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
        const { label, summary, number, imgUrl } = this.state;
        return (
            <div style={useStyles.root}>
                <ExpansionPanel
                    expanded={expanded === 'aboutPanel'}
                    onChange={action}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography style={useStyles.heading}>
                            About You
                        </Typography>
                        <Typography style={useStyles.secondaryHeading}>
                            <i>Tell us a bit more about yourself</i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="epDetails">
                            <input
                                value={number}
                                onChange={this.handleInputChange}
                                name="number"
                                type="number"
                                required
                                placeholder="Contact Number:"
                            />
                            <input
                                value={label}
                                onChange={this.handleInputChange}
                                name="label"
                                type="text"
                                required
                                placeholder="Label: Student"
                            />
                            <input
                                value={imgUrl}
                                onChange={this.handleInputChange}
                                name="imgUrl"
                                type="text"
                                placeholder="Image URL: Please upload a url link to your image"
                            />
                            <textarea
                                value={summary}
                                onChange={this.handleInputChange}
                                name="summary"
                                resize="none"
                                required
                                placeholder="A brief summary about you ..."
                            />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

AboutExpansionPanel.propTypes = {
    expanded: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
    existingContactData: PropTypes.oneOfType([PropTypes.object]).isRequired,
    existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AboutExpansionPanel;
