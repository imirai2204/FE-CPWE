import { Dialog, DialogContent, DialogTitle, Typography, DialogActions } from "@mui/material";
import React, { useState } from "react";
import "../../../styles/style.scss";

function ConfirmDialog({ confirmDialog, setConfirmDialog, deleteTag, props }) {
    const [buttonShown, setButtonShown] = useState(false);

    const clickTerms = () => {
        setButtonShown(!buttonShown);
    };

    const handleClickYes = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        deleteTag();
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
                    onClick={() => {
                        setConfirmDialog({ ...confirmDialog, isOpen: false });
                        setButtonShown(false);
                    }}>
                    NO
                </button>
                <button
                    className={`btn btn-danger ${buttonShown ? "" : "disabled"}`}
                    onClick={handleClickYes}
                    type='submit'>
                    YES
                </button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
