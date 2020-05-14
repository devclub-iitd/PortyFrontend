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
import VolunteerDetails from './volunteerDetailsContainer';

class VolunteerExpansionPanel extends React.Component {
    constructor(props) {
        super(props);
        const { existingData } = this.props;
        const tempFields = [];
        const tempFieldsTracker = [];
        let btnDisp = 'none';
        if (existingData.length > 1) {
            btnDisp = 'block';
        }
        this.state = {
            volunteerDetailsCount: existingData.length,
            maxCount: existingData.length,
            btnStyle: {
                display: btnDisp,
            },
            expanded: false,
            volunteerFields: tempFields,
            volunteerFieldTracker: tempFieldsTracker,
            volunteer: existingData,
        };
        const { expanded } = this.state;
        for (let i = 0; i < existingData.length; i += 1) {
            tempFields.push(
                <VolunteerDetails
                    data={existingData[i]}
                    handleChange={this.handleInputChange}
                    key={i}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`volunteerPanel${i}`)}
                    moveFieldDown={() => this.moveFieldDown(i, i)}
                    moveFieldUp={() => this.moveFieldUp(i, i)}
                />
            );
            tempFieldsTracker.push(i);
        }
        this.onAddChild = this.onAddChild.bind(this);
        this.onSubChild = this.onSubChild.bind(this);
        this.handlePanel = this.handlePanel.bind(this);
        this.moveFieldUp = this.moveFieldUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onAddChild() {
        const { volunteerFields } = this.state;
        const { volunteerFieldTracker } = this.state;
        const { volunteerDetailsCount } = this.state;
        const { maxCount } = this.state;
        const { expanded } = this.state;
        const tempFields = volunteerFields;
        const tempFieldsTracker = volunteerFieldTracker;
        const id = volunteerDetailsCount;
        const key = maxCount;
        const exp = expanded;
        const { volunteer } = this.state;
        const volunteerObj = {
            organisation: '',
            position: '',
            website: '',
            startdate: '',
            enddate: '',
            summary: '',
            hidden: false,
        };
        tempFieldsTracker.push(key);
        tempFields.push(
            <VolunteerDetails
                data={volunteerObj}
                handleChange={this.handleInputChange}
                key={key}
                id={id}
                expanded={exp}
                action={() => this.handlePanel(`volunteerPanel${id}`)}
                moveFieldDown={() => this.moveFieldDown(key, id)}
                moveFieldUp={() => this.moveFieldUp(key, id)}
            />
        );
        const tempvolunteer = volunteer;
        tempvolunteer.push(volunteerObj);
        this.setState((state) => ({
            volunteerDetailsCount: state.volunteerDetailsCount + 1,
            maxCount: state.maxCount + 1,
            btnStyle: {
                display: 'block',
            },
            volunteerFields: tempFields,
            volunteerFieldTracker: tempFieldsTracker,
            volunteer: tempvolunteer,
        }));
    }

    onSubChild() {
        const { volunteerFields } = this.state;
        const { volunteerFieldTracker } = this.state;
        const { volunteerDetailsCount } = this.state;
        const tempFields = volunteerFields;
        const tempFieldsTracker = volunteerFieldTracker;
        tempFieldsTracker.pop();
        tempFields.pop();
        const { volunteer } = this.state;
        const tempvolunteer = volunteer;
        tempvolunteer.pop();
        this.setState((state) => ({
            volunteerDetailsCount: state.volunteerDetailsCount - 1,
            volunteerFields: tempFields,
            volunteerFieldTracker: tempFieldsTracker,
            volunteer: tempvolunteer,
        }));
        if (volunteerDetailsCount === 2) {
            this.setState({
                btnStyle: {
                    display: 'none',
                },
            });
        }
    }

    callApiRequest() {
        const { volunteer } = this.state;
        const { senData } = this.props;
        senData('volunteer', volunteer);
    }

    handleInputChange(event) {
        const { id } = event.target;
        const {
            volunteer,
            volunteerFieldTracker,
            volunteerDetailsCount,
            expanded,
        } = this.state;
        const type = event.target.name;
        const tempFields = [];
        const tempFieldsTracker = volunteerFieldTracker;
        const tempvolunteer = volunteer;
        if (type === 'hidden') {
            tempvolunteer[id][type] = event.target.checked;
        } else {
            tempvolunteer[id][type] = event.target.value;
        }
        for (let i = 0; i < volunteerDetailsCount; i += 1) {
            const k = tempFieldsTracker[i];
            tempFields.push(
                <VolunteerDetails
                    data={tempvolunteer[i]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`volunteerPanel${i}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i)}
                    moveFieldUp={() => this.moveFieldUp(k, i)}
                />
            );
        }
        this.setState({
            volunteer: tempvolunteer,
            volunteerFields: tempFields,
        });
    }

    handlePanel(panel) {
        const { expanded } = this.state;
        const { volunteerFieldTracker } = this.state;
        const { volunteerDetailsCount } = this.state;
        const { volunteer } = this.state;
        if (expanded === panel) {
            const tempFields = [];
            const tempFieldsTracker = volunteerFieldTracker;
            for (let i = 0; i < volunteerDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <VolunteerDetails
                        data={volunteer[i]}
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={false}
                        action={() => this.handlePanel(`volunteerPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: false,
                volunteerFields: tempFields,
            });
        } else {
            const tempFields = [];
            const tempFieldsTracker = volunteerFieldTracker;
            for (let i = 0; i < volunteerDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <VolunteerDetails
                        data={volunteer[i]}
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={panel}
                        action={() => this.handlePanel(`volunteerPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: panel,
                volunteerFields: tempFields,
            });
        }
    }

    moveFieldUp(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { volunteerFieldTracker } = this.state;
        const { volunteerFields } = this.state;
        const tempFields = volunteerFields;
        const tempFieldsTracker = volunteerFieldTracker;
        const { volunteer } = this.state;
        const tempvolunteer = volunteer;
        if (i !== 0) {
            const tempstore = tempvolunteer[i];
            tempvolunteer[i] = tempvolunteer[i - 1];
            tempvolunteer[i - 1] = tempstore;

            const storeFieldTracker = tempFieldsTracker[i - 1];
            tempFieldsTracker[i - 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <VolunteerDetails
                    data={tempvolunteer[i]}
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`volunteerPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i - 1] = (
                <VolunteerDetails
                    data={tempvolunteer[i - 1]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i - 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`volunteerPanel${i - 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i - 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i - 1)}
                />
            );
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            volunteerFields: tempFields,
            volunteerFieldTracker: tempFieldsTracker,
            volunteer: tempvolunteer,
        });
    }

    moveFieldDown(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { volunteerFieldTracker } = this.state;
        const { volunteerFields } = this.state;
        const { volunteerDetailsCount } = this.state;
        const tempFields = volunteerFields;
        const tempFieldsTracker = volunteerFieldTracker;
        const { volunteer } = this.state;
        const tempvolunteer = volunteer;
        if (i !== volunteerDetailsCount - 1) {
            const tempstore = tempvolunteer[i];
            tempvolunteer[i] = tempvolunteer[i + 1];
            tempvolunteer[i + 1] = tempstore;
            const storeFieldTracker = tempFieldsTracker[i + 1];
            tempFieldsTracker[i + 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <VolunteerDetails
                    data={tempvolunteer[i]}
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`volunteerPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i + 1] = (
                <VolunteerDetails
                    data={tempvolunteer[i + 1]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i + 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`volunteerPanel${i + 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i + 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i + 1)}
                />
            );
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            volunteerFields: tempFields,
            volunteerFieldTracker: tempFieldsTracker,
            volunteer: tempvolunteer,
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
        const { volunteerFields } = this.state;
        const { btnStyle } = this.state;
        return (
            <div style={useStyles.root}>
                <ExpansionPanel
                    expanded={expanded === 'volunteerPanel'}
                    onChange={action}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography style={useStyles.heading}>
                            Volunteer
                        </Typography>
                        <Typography style={useStyles.secondaryHeading}>
                            <i>
                                Volunteering activities | PORs | Other roles |
                                Etc.
                            </i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="customDetailContainer">
                            <div>{volunteerFields}</div>
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

VolunteerExpansionPanel.propTypes = {
    expanded: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
    existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default VolunteerExpansionPanel;
