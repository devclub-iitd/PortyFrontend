/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AwardDetails from './awardDetailsContainer';

class AwardExpansionPanel extends React.Component {
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
            awardDetailsCount: existingData.length,
            maxCount: existingData.length,
            btnStyle: {
                display: btnDisp,
            },
            expanded: false,
            awardFields: tempFields,
            awardFieldTracker: tempFieldsTracker,
            award: existingData,
        };
        const { expanded } = this.state;
        for (let i = 0; i < existingData.length; i += 1) {
            tempFields.push(
                <AwardDetails
                    data={existingData[i]}
                    handleChange={this.handleInputChange}
                    key={i}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`awardPanel${i}`)}
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
        const { awardFields } = this.state;
        const { awardFieldTracker } = this.state;
        const { awardDetailsCount } = this.state;
        const { maxCount } = this.state;
        const { expanded } = this.state;
        const tempFields = awardFields;
        const tempFieldsTracker = awardFieldTracker;
        const id = awardDetailsCount;
        const key = maxCount;
        const exp = expanded;
        const { award } = this.state;
        const awardObj = {
            title: '',
            date: '',
            awarder: '',
            details: '',
            hidden: false,
        };
        tempFieldsTracker.push(key);
        tempFields.push(
            <AwardDetails
                data={awardObj}
                handleChange={this.handleInputChange}
                key={key}
                id={id}
                expanded={exp}
                action={() => this.handlePanel(`awardPanel${id}`)}
                moveFieldDown={() => this.moveFieldDown(key, id)}
                moveFieldUp={() => this.moveFieldUp(key, id)}
            />
        );
        const tempaward = award;
        tempaward.push(awardObj);
        this.setState((state) => ({
            awardDetailsCount: state.awardDetailsCount + 1,
            maxCount: state.maxCount + 1,
            btnStyle: {
                display: 'block',
            },
            awardFields: tempFields,
            awardFieldTracker: tempFieldsTracker,
            award: tempaward,
        }));
    }

    onSubChild() {
        const { awardFields } = this.state;
        const { awardFieldTracker } = this.state;
        const { awardDetailsCount } = this.state;
        const tempFields = awardFields;
        const tempFieldsTracker = awardFieldTracker;
        tempFieldsTracker.pop();
        tempFields.pop();
        const { award } = this.state;
        const tempaward = award;
        tempaward.pop();
        this.setState((state) => ({
            awardDetailsCount: state.awardDetailsCount - 1,
            awardFields: tempFields,
            awardFieldTracker: tempFieldsTracker,
            award: tempaward,
        }));
        if (awardDetailsCount === 2) {
            this.setState({
                btnStyle: {
                    display: 'none',
                },
            });
        }
    }

    callApiRequest() {
        const { award } = this.state;
        const { senData } = this.props;
        senData('awards', award);
    }

    handleInputChange(event) {
        const { id } = event.target;
        const {
            award,
            awardFieldTracker,
            awardDetailsCount,
            expanded,
        } = this.state;
        const type = event.target.name;
        const tempFields = [];
        const tempFieldsTracker = awardFieldTracker;
        const tempaward = award;
        if (type === 'hidden') {
            tempaward[id][type] = event.target.checked;
        } else {
            tempaward[id][type] = event.target.value;
        }
        for (let i = 0; i < awardDetailsCount; i += 1) {
            const k = tempFieldsTracker[i];
            tempFields.push(
                <AwardDetails
                    data={tempaward[i]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`awardPanel${i}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i)}
                    moveFieldUp={() => this.moveFieldUp(k, i)}
                />
            );
        }
        this.setState({
            award: tempaward,
            awardFields: tempFields,
        });
    }

    handlePanel(panel) {
        const { expanded } = this.state;
        const { awardFieldTracker } = this.state;
        const { awardDetailsCount } = this.state;
        const { award } = this.state;
        if (expanded === panel) {
            const tempFields = [];
            const tempFieldsTracker = awardFieldTracker;
            for (let i = 0; i < awardDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <AwardDetails
                        data={award[i]}
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={false}
                        action={() => this.handlePanel(`awardPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: false,
                awardFields: tempFields,
            });
        } else {
            const tempFields = [];
            const tempFieldsTracker = awardFieldTracker;
            for (let i = 0; i < awardDetailsCount; i += 1) {
                const k = tempFieldsTracker[i];
                tempFields.push(
                    <AwardDetails
                        data={award[i]}
                        handleChange={this.handleInputChange}
                        key={k}
                        id={i}
                        expanded={panel}
                        action={() => this.handlePanel(`awardPanel${i}`)}
                        moveFieldDown={() => this.moveFieldDown(k, i)}
                        moveFieldUp={() => this.moveFieldUp(k, i)}
                    />
                );
            }
            this.setState({
                expanded: panel,
                awardFields: tempFields,
            });
        }
    }

    moveFieldUp(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { awardFieldTracker } = this.state;
        const { awardFields } = this.state;
        const tempFields = awardFields;
        const tempFieldsTracker = awardFieldTracker;
        const { award } = this.state;
        const tempaward = award;
        if (i !== 0) {
            const tempstore = tempaward[i];
            tempaward[i] = tempaward[i - 1];
            tempaward[i - 1] = tempstore;

            const storeFieldTracker = tempFieldsTracker[i - 1];
            tempFieldsTracker[i - 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <AwardDetails
                    data={tempaward[i]}
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`awardPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i - 1] = (
                <AwardDetails
                    data={tempaward[i - 1]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i - 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`awardPanel${i - 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i - 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i - 1)}
                />
            );
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            awardFields: tempFields,
            awardFieldTracker: tempFieldsTracker,
            award: tempaward,
        });
    }

    moveFieldDown(k, i) {
        // alert(k);
        const { expanded } = this.state;
        const { awardFieldTracker } = this.state;
        const { awardFields } = this.state;
        const { awardDetailsCount } = this.state;
        const tempFields = awardFields;
        const tempFieldsTracker = awardFieldTracker;
        const { award } = this.state;
        const tempaward = award;
        if (i !== awardDetailsCount - 1) {
            const tempstore = tempaward[i];
            tempaward[i] = tempaward[i + 1];
            tempaward[i + 1] = tempstore;
            const storeFieldTracker = tempFieldsTracker[i + 1];
            tempFieldsTracker[i + 1] = tempFieldsTracker[i];
            tempFieldsTracker[i] = storeFieldTracker;
            tempFields[i] = (
                <AwardDetails
                    data={tempaward[i]}
                    handleChange={this.handleInputChange}
                    key={storeFieldTracker}
                    id={i}
                    expanded={expanded}
                    action={() => this.handlePanel(`awardPanel${i}`)}
                    moveFieldDown={() =>
                        this.moveFieldDown(storeFieldTracker, i)
                    }
                    moveFieldUp={() => this.moveFieldUp(storeFieldTracker, i)}
                />
            );
            tempFields[i + 1] = (
                <AwardDetails
                    data={tempaward[i + 1]}
                    handleChange={this.handleInputChange}
                    key={k}
                    id={i + 1}
                    expanded={expanded}
                    action={() => this.handlePanel(`awardPanel${i + 1}`)}
                    moveFieldDown={() => this.moveFieldDown(k, i + 1)}
                    moveFieldUp={() => this.moveFieldUp(k, i + 1)}
                />
            );
        } else {
            alert('you cant move this field any more');
        }
        this.setState({
            awardFields: tempFields,
            awardFieldTracker: tempFieldsTracker,
            award: tempaward,
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
        const { awardFields } = this.state;
        const { btnStyle } = this.state;
        return (
            <div style={useStyles.root}>
                <ExpansionPanel
                    expanded={expanded === 'awardPanel'}
                    onChange={action}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography style={useStyles.heading}>Award</Typography>
                        <Typography style={useStyles.secondaryHeading}>
                            <i>Significant Achievements | Awards Recieved</i>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="customDetailContainer">
                            <div>{awardFields}</div>
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

AwardExpansionPanel.propTypes = {
    expanded: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    senData: PropTypes.func.isRequired,
    existingData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AwardExpansionPanel;
