// TODO: Add different alert UI
/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PublicationDetails from './publicationDetailsContainer';

class PublicationExpansionPanel extends React.Component {
    constructor(props) {
        super(props);
        const tempFields = [];
        const tempFieldsTracker = [];
        this.state = {
            publicationDetailsCount: 1,
            maxCount: 1,
            btnStyle: {
                display: 'none',
            },
            expanded: false,
            publicationFields: tempFields,
            publicationFieldTracker: tempFieldsTracker,
            publication: [
                {
                    name: '',
                    publisher: '',
                    releaseDate: '',
                    website: '',
                    summary: '',
                    hidden: false,
                },
            ],
        };
        const { expanded } = this.state;
        tempFields.push(
            <PublicationDetails
                handleChange={this.handleInputChange}
                key={0}
                id={0}
                expanded={expanded}
                action={() => this.handlePanel(`publicationPanel${0}`)}
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
        const { publicationFields } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationDetailsCount, maxCount } = this.state;
        const { expanded } = this.state;
        const tempFields = publicationFields;
        const tempFieldsTracker = publicationFieldTracker;
        const i = publicationDetailsCount;
        const key = maxCount;
        const exp = expanded;
        tempFieldsTracker.push(key);
        tempFields.push(
            <PublicationDetails
                handleChange={this.handleInputChange}
                key={key}
                id={i}
                expanded={exp}
                action={() => this.handlePanel(`volunteerPanel${i}`)}
                moveFieldDown={() => this.moveFieldDown(key, i)}
                moveFieldUp={() => this.moveFieldUp(key, i)}
            />
        );

        const { publication } = this.state;
        const publicationObj = {
            name: '',
            publisher: '',
            releaseDate: '',
            website: '',
            summary: '',
            hidden: false,
        };
        const temppublication = publication;
        temppublication.push(publicationObj);
        this.setState((state) => ({
            publicationDetailsCount: state.publicationDetailsCount + 1,
            maxCount: state.maxCount + 1,
            btnStyle: {
                display: 'block',
            },
            publicationFields: tempFields,
            publicationFieldTracker: tempFieldsTracker,
            publication: temppublication,
        }));
    }

    onSubChild() {
        const { publicationFields } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationDetailsCount } = this.state;
        const tempFields = publicationFields;
        const tempFieldsTracker = publicationFieldTracker;
        tempFieldsTracker.pop();
        tempFields.pop();
        const { publication } = this.state;
        const temppublication = publication;
        temppublication.pop();
        this.setState((state) => ({
            publicationDetailsCount: state.publicationDetailsCount - 1,
            publicationFields: tempFields,
            publicationFieldTracker: tempFieldsTracker,
            publication: temppublication,
        }));
        if (publicationDetailsCount === 2) {
            this.setState({
                btnStyle: {
                    display: 'none',
                },
            });
        }
    }

    callApiRequest() {
        const { publication } = this.state;
        const { senData } = this.props;
        senData('publications', publication);
    }

    handleInputChange(event) {
        const { id } = event.target;
        const { publication } = this.state;
        const type = event.target.name;
        const temppublication = publication;
        if (type === 'hidden') {
            temppublication[id][type] = event.target.checked;
        } else {
            temppublication[id][type] = event.target.value;
        }
        this.setState({
            publication: temppublication,
        });
    }

    handlePanel(panel) {
        const { expanded } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationDetailsCount } = this.state;
        if (expanded === panel) {
            const tempFields = [];
            const tempFieldsTracker = publicationFieldTracker;
            for (let i = 0; i < publicationDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <PublicationDetails
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={false}
                        action={() => this.handlePanel(`publicationPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: false,
                publicationFields: tempFields,
            });
        } else {
            const tempFields = [];
            const tempFieldsTracker = publicationFieldTracker;
            for (let i = 0; i < publicationDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <PublicationDetails
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={panel}
                        action={() => this.handlePanel(`publicationPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: panel,
                publicationFields: tempFields,
            });
        }
    }

    moveFieldUp(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationFields } = this.state;
        const tempFields = publicationFields;
        const tempFieldsTracker = publicationFieldTracker;
        const { publication } = this.state;
        const temppublication = publication;
        if (i !== 0) {
            const storeFieldTracker = tempFieldsTracker[i - 1];
            tempFieldsTracker[i - 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <PublicationDetails
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i - 1] = (
                <PublicationDetails
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i - 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i - 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i - 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i - 1)}
                />
            );

            const tempstore = temppublication[i];
            temppublication[i] = temppublication[i - 1];
            temppublication[i - 1] = tempstore;
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            publicationFields: tempFields,
            publicationFieldTracker: tempFieldsTracker,
            publication: temppublication,
        });
    }

    moveFieldDown(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationFields } = this.state;
        const { publicationDetailsCount } = this.state;
        const tempFields = publicationFields;
        const tempFieldsTracker = publicationFieldTracker;
        const { publication } = this.state;
        const temppublication = publication;
        if (i !== publicationDetailsCount - 1) {
            const storeFieldTracker = tempFieldsTracker[i + 1];
            tempFieldsTracker[i + 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <PublicationDetails
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i + 1] = (
                <PublicationDetails
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i + 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i + 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i + 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i + 1)}
                />
            );

            const tempstore = temppublication[i];
            temppublication[i] = temppublication[i + 1];
            temppublication[i + 1] = tempstore;
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            publicationFields: tempFields,
            publicationFieldTracker: tempFieldsTracker,
            publication: temppublication,
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
        const { publicationFields } = this.state;
        const { btnStyle } = this.state;
        return (
            <div style={useStyles.root}>
                <ExpansionPanel
                    expanded={expanded === 'publicationPanel'}
                    onChange={action}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography style={useStyles.heading}>
                            Publications
                        </Typography>
                        <Typography style={useStyles.secondaryHeading}>
                            <i>Tell us about your publications</i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="customDetailContainer">
                            <div>{publicationFields}</div>
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

PublicationExpansionPanel.propTypes = {
    expanded: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
};

export default PublicationExpansionPanel;
