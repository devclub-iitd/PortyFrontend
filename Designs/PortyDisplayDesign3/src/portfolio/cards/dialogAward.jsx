import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function TransitionComponent(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const { open, handleDialogClose, title, children, date, awarder } = props;
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                maxWidth="sm"
                keepMounted
                onClose={() => handleDialogClose({ title })}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                style={{ padding: '50px' }}
                className="awardDialog"
            >
                <DialogTitle
                    className="awardDialogTitle"
                    id="alert-dialog-slide-title"
                >
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        style={{ overflowWrap: 'normal' }}
                    >
                        <div className="portfolioAwardCompany">
                            <span>
                                <b>Awarded By -</b>
                            </span>{' '}
                            {awarder}
                        </div>
                        <div className="portfolioAwardDate">
                            <span>
                                <b>Awarded On -</b>
                            </span>{' '}
                            {date}
                        </div>
                        <br />
                        <div className="portfolioAwardSummary">{children}</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose({ title })}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AlertDialogSlide.propTypes = {
    open: PropTypes.bool.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    awarder: PropTypes.string.isRequired,
};
