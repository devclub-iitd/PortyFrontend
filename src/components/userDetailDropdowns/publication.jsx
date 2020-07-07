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
        const { existingData, mode } = this.props;
        const tempFields = [];
        const tempFieldsTracker = [];
        let btnDisp = 'none';
        if (mode === 'edit') {
            if (existingData.length > 1) {
                btnDisp = 'block';
            }
        }
        if (mode === 'edit') {
            this.state = {
                publicationDetailsCount: existingData.length,
                maxCount: existingData.length,
                btnStyle: {
                    display: btnDisp,
                },
                expanded: false,
                publicationFields: tempFields,
                publicationFieldTracker: tempFieldsTracker,
                publication: existingData,
            };
        }
        if (mode === 'register') {
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
        }
        const { expanded } = this.state;
        if (mode === 'edit') {
            for (let i = 0; i < existingData.length; i += 1) {
                tempFields.push(
                    <PublicationDetails
                        data={existingData[i]}
                        handleChange={this.handleInputChange}
                        key={i}
                        id={i}
                        expanded={expanded}
                        action={() => this.handlePanel(`publicationPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(i, i)}
                        moveFieldUp={() => this.moveFieldUp(i, i)}
                    />
                );
                tempFieldsTracker.push(i);
            }
        }
        if (mode === 'register') {
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
        }
        this.onAddChild = this.onAddChild.bind(this);
        this.onSubChild = this.onSubChild.bind(this);
        this.handlePanel = this.handlePanel.bind(this);
        this.moveFieldUp = this.moveFieldUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onAddChild() {
        const { publicationFields } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationDetailsCount } = this.state;
        const { maxCount } = this.state;
        const { expanded } = this.state;
        const tempFields = publicationFields;
        const tempFieldsTracker = publicationFieldTracker;
        const id = publicationDetailsCount;
        const key = maxCount;
        const exp = expanded;
        const { publication } = this.state;
        const publicationObj = {
            name: '',
            publisher: '',
            releaseDate: '',
            website: '',
            summary: '',
            hidden: false,
        };
        tempFieldsTracker.push(key);
        tempFields.push(
            <PublicationDetails
                data={publicationObj}
                handleChange={this.handleInputChange}
                key={key}
                id={id}
                expanded={exp}
                action={() => this.handlePanel(`publicationPanel${id}`)}
                moveFieldDown={() => this.moveFieldDown(key, id)}
                moveFieldUp={() => this.moveFieldUp(key, id)}
            />
        );
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
        const {
            publication,
            publicationFieldTracker,
            publicationDetailsCount,
            expanded,
        } = this.state;
        const type = event.target.name;
        const tempFields = [];
        const tempFieldsTracker = publicationFieldTracker;
        const temppublication = publication;
        if (type === 'hidden') {
            temppublication[id][type] = event.target.checked;
        } else {
            temppublication[id][type] = event.target.value;
        }
        for (let i = 0; i < publicationDetailsCount; i += 1) {
            const k = tempFieldsTracker[i];
            tempFields.push(
                <PublicationDetails
                    data={temppublication[i]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i)}
                    moveFieldUp={() => this.moveFieldUp(k, i)}
                />
            );
        }
        this.setState({
            publication: temppublication,
            publicationFields: tempFields,
        });
    }

    handlePanel(panel) {
        const { expanded } = this.state;
        const { publicationFieldTracker } = this.state;
        const { publicationDetailsCount } = this.state;
        const { publication } = this.state;
        if (expanded === panel) {
            const tempFields = [];
            const tempFieldsTracker = publicationFieldTracker;
            for (let i = 0; i < publicationDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <PublicationDetails
                        data={publication[i]}
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
                        data={publication[i]}
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
            const tempstore = temppublication[i];
            temppublication[i] = temppublication[i - 1];
            temppublication[i - 1] = tempstore;

            const storeFieldTracker = tempFieldsTracker[i - 1];
            tempFieldsTracker[i - 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <PublicationDetails
                    data={temppublication[i]}
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
                    data={temppublication[i - 1]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i - 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i - 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i - 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i - 1)}
                />
            );
        } else {
            const { handleAlert } = this.props;
            handleAlert(true);
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
            const tempstore = temppublication[i];
            temppublication[i] = temppublication[i + 1];
            temppublication[i + 1] = tempstore;
            const storeFieldTracker = tempFieldsTracker[i + 1];
            tempFieldsTracker[i + 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <PublicationDetails
                    data={temppublication[i]}
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
                    data={temppublication[i + 1]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i + 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`publicationPanel${i + 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i + 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i + 1)}
                />
            );
        } else {
            const { handleAlert } = this.props;
            handleAlert(true);
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
                            Publication
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
    mode: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
    handleAlert: PropTypes.func.isRequired,
    existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PublicationExpansionPanel;
