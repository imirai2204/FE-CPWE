import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import "../../../styles/style.scss";

function ConfirmDialog(props) {
    const [buttonShown, setButtonShown] = useState(false);
    const { confirmDialog, setConfirmDialog } = props;

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    return (
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle>
                <Typography varient='h6'>{confirmDialog.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography varient='subtitle2'>{confirmDialog.subTitle}</Typography>
            </DialogContent>
            <DialogActions className='container--idea--submit'>
                <label className='checkbox'>
                    <input type='checkbox' onClick={clickTerms} />
                    <span></span>
                    <label>Are you sure?</label>
                </label>
                <button
                    className='btn btn-noline'
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                    NO
                </button>
                <button
                    className={`btn btn-danger ${buttonShown ? "" : "disabled"}`}
                    onClick={() => console.log(confirmDialog.selectDelete)}
                    type='submit'>
                    YES
                </button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
