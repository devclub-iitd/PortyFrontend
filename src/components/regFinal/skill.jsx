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
import SkillDetails from './skillDetailsContainer';

class SkillExpansionPanel extends React.Component {
    constructor(props) {
        super(props);
        const tempFields = [];
        const tempFieldsTracker = [];
        this.state = {
            skillDetailsCount: 1,
            maxCount: 1,
            btnStyle: {
                display: 'none',
            },
            expanded: false,
            skillFields: tempFields,
            skillFieldTracker: tempFieldsTracker,
            skill: [
                {
                    name: '',
                    level: '',
                    keywords: '',
                    hidden: false,
                },
            ],
        };
        const { expanded } = this.state;
        tempFields.push(
            <SkillDetails
                handleChange={this.handleInputChange}
                key={0}
                id={0}
                expanded={expanded}
                action={() => this.handlePanel(`skillPanel${0}`)}
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
        const { skillFields } = this.state;
        const { skillFieldTracker } = this.state;
        const { skillDetailsCount, maxCount } = this.state;
        const { expanded } = this.state;
        const tempFields = skillFields;
        const tempFieldsTracker = skillFieldTracker;
        const i = skillDetailsCount;
        const key = maxCount;
        const exp = expanded;
        tempFieldsTracker.push(key);
        tempFields.push(
            <SkillDetails
                handleChange={this.handleInputChange}
                key={key}
                id={i}
                expanded={exp}
                action={() => this.handlePanel(`volunteerPanel${i}`)}
                moveFieldDown={() => this.moveFieldDown(key, i)}
                moveFieldUp={() => this.moveFieldUp(key, i)}
            />
        );

        const { skill } = this.state;
        const skillObj = {
            name: '',
            level: '',
            keywords: '',
            hidden: false,
        };
        const tempskill = skill;
        tempskill.push(skillObj);
        this.setState((state) => ({
            skillDetailsCount: state.skillDetailsCount + 1,
            maxCount: state.maxCount + 1,
            btnStyle: {
                display: 'block',
            },
            skillFields: tempFields,
            skillFieldTracker: tempFieldsTracker,
            skill: tempskill,
        }));
    }

    onSubChild() {
        const { skillFields } = this.state;
        const { skillFieldTracker } = this.state;
        const { skillDetailsCount } = this.state;
        const tempFields = skillFields;
        const tempFieldsTracker = skillFieldTracker;
        tempFieldsTracker.pop();
        tempFields.pop();
        const { skill } = this.state;
        const tempskill = skill;
        tempskill.pop();
        this.setState((state) => ({
            skillDetailsCount: state.skillDetailsCount - 1,
            skillFields: tempFields,
            skillFieldTracker: tempFieldsTracker,
            skill: tempskill,
        }));
        if (skillDetailsCount === 2) {
            this.setState({
                btnStyle: {
                    display: 'none',
                },
            });
        }
    }

    callApiRequest() {
        const { skill } = this.state;
        const { senData } = this.props;
        senData('skills', skill);
    }

    handleInputChange(event) {
        const { id } = event.target;
        const { skill } = this.state;
        const type = event.target.name;
        const tempskill = skill;
        if (type === 'hidden') {
            tempskill[id][type] = event.target.checked;
        } else {
            tempskill[id][type] = event.target.value;
        }
        this.setState({
            skill: tempskill,
        });
    }

    handlePanel(panel) {
        const { expanded } = this.state;
        const { skillFieldTracker } = this.state;
        const { skillDetailsCount } = this.state;
        if (expanded === panel) {
            const tempFields = [];
            const tempFieldsTracker = skillFieldTracker;
            for (let i = 0; i < skillDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <SkillDetails
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={false}
                        action={() => this.handlePanel(`skillPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: false,
                skillFields: tempFields,
            });
        } else {
            const tempFields = [];
            const tempFieldsTracker = skillFieldTracker;
            for (let i = 0; i < skillDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <SkillDetails
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={panel}
                        action={() => this.handlePanel(`skillPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: panel,
                skillFields: tempFields,
            });
        }
    }

    moveFieldUp(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { skillFieldTracker } = this.state;
        const { skillFields } = this.state;
        const tempFields = skillFields;
        const tempFieldsTracker = skillFieldTracker;
        const { skill } = this.state;
        const tempskill = skill;
        if (i !== 0) {
            const storeFieldTracker = tempFieldsTracker[i - 1];
            tempFieldsTracker[i - 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <SkillDetails
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`skillPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i - 1] = (
                <SkillDetails
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i - 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`skillPanel${i - 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i - 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i - 1)}
                />
            );

            const tempstore = tempskill[i];
            tempskill[i] = tempskill[i - 1];
            tempskill[i - 1] = tempstore;
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            skillFields: tempFields,
            skillFieldTracker: tempFieldsTracker,
            skill: tempskill,
        });
    }

    moveFieldDown(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { skillFieldTracker } = this.state;
        const { skillFields } = this.state;
        const { skillDetailsCount } = this.state;
        const tempFields = skillFields;
        const tempFieldsTracker = skillFieldTracker;
        const { skill } = this.state;
        const tempskill = skill;
        if (i !== skillDetailsCount - 1) {
            const storeFieldTracker = tempFieldsTracker[i + 1];
            tempFieldsTracker[i + 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <SkillDetails
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`skillPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i + 1] = (
                <SkillDetails
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i + 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`skillPanel${i + 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i + 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i + 1)}
                />
            );

            const tempstore = tempskill[i];
            tempskill[i] = tempskill[i + 1];
            tempskill[i + 1] = tempstore;
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            skillFields: tempFields,
            skillFieldTracker: tempFieldsTracker,
            skill: tempskill,
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
        const { skillFields } = this.state;
        const { btnStyle } = this.state;
        return (
            <div style={useStyles.root}>
                <ExpansionPanel
                    expanded={expanded === 'skillPanel'}
                    onChange={action}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography style={useStyles.heading}>
                            Skills
                        </Typography>
                        <Typography style={useStyles.secondaryHeading}>
                            <i>Showcase your skills</i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="customDetailContainer">
                            <div>{skillFields}</div>
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

SkillExpansionPanel.propTypes = {
    expanded: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
};

export default SkillExpansionPanel;
