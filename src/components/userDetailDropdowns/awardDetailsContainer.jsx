import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const AwardField = (props) => {
    const { id } = props;
    const { expanded } = props;
    const { action } = props;
    const { moveFieldUp } = props;
    const { moveFieldDown } = props;
    const { handleChange } = props;
    const { data } = props;
    let { ndata } = [];
    if (data === undefined) {
        ndata = [
            {
                title: '',
                date: '',
                awarder: '',
                details: '',
                hidden: false,
            },
        ];
    }
    if (data !== undefined) {
        ndata = data;
    }
    const [state, setState] = React.useState({
        hidden: ndata.hidden,
    });

    const handleCheckBoxChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked });
        handleChange(event);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ExpansionPanel
                expanded={expanded === `awardPanel${id}`}
                onChange={action}
                style={{ marginTop: '10px', color: '#3d40d8', width: '100%' }}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography style={{ fontWeight: 700 }}>
                        AWARD {id + 1}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="customDetailContainer">
                        <div className="sectionSeperator" />
                        <input
                            value={ndata.title}
                            id={id}
                            onChange={handleChange}
                            name="title"
                            type="text"
                            placeholder="Title:"
                        />
                        <div className="row rowtwo">
                            <input
                                value={ndata.date}
                                id={id}
                                onChange={handleChange}
                                name="date"
                                className="left"
                                type="text"
                                placeholder="Date Awarded: DD/MM/YYYY"
                            />
                            <input
                                value={ndata.awarder}
                                id={id}
                                onChange={handleChange}
                                name="awarder"
                                className="right"
                                type="text"
                                placeholder="Awarded By:"
                            />
                        </div>
                        <textarea
                            value={ndata.details}
                            id={id}
                            onChange={handleChange}
                            name="details"
                            resize="none"
                            placeholder="Details: "
                        />
                        <div style={{ marginLeft: '2px', marginTop: '15px' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={id}
                                        name="hidden"
                                        checked={state.hidden}
                                        onChange={handleCheckBoxChange(
                                            'hidden'
                                        )}
                                        value="hidden"
                                    />
                                }
                                label="Hidden"
                            />
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div className="sideBtnCont">
                <ButtonGroup
                    color="secondary"
                    aria-label="Outlined primary button group"
                    size="small"
                >
                    <IconButton
                        aria-label="Move Field Up"
                        onClick={moveFieldUp}
                    >
                        <ArrowUp />
                    </IconButton>
                    <IconButton
                        aria-label="Move Field Down"
                        onClick={moveFieldDown}
                    >
                        <ArrowDown />
                    </IconButton>
                </ButtonGroup>
            </div>
        </div>
    );
};

AwardField.propTypes = {
    id: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    moveFieldUp: PropTypes.func.isRequired,
    moveFieldDown: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AwardField;
