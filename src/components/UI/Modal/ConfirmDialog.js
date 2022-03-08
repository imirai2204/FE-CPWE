import { Dialog, DialogContent, DialogTitle, Typography, DialogActions } from '@mui/material'
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/style.scss"

function ConfirmDialog(props) {

  const [buttonShown, setButtonShown] = useState(false);
  const { confirmDialog, setConfirmDialog } = props;
  

  const clickTerms = () => {
    setButtonShown(!buttonShown);
};


  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle>
        <Typography varient="h6">
          {confirmDialog.title}
        </Typography>
      </DialogTitle >
      <DialogContent>
        <Typography varient="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className='container--idea--submit check-submit'>
        <label className='checkbox'>
          <input type='checkbox' onClick={clickTerms} />
          <span></span>
          <Link
            to='/terms-conditions'
            className='terms-link'
            target='_blank'>
            Terms & Conditions
          </Link>
        </label>
        <button class="btn btn-warning" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}> NO </button>
        <button className={`btn btn-danger ${buttonShown ? "" : "disabled"
          }`}
          type='submit'> YES 
          </button>
      </DialogActions>

    </Dialog>
  )
}

export default ConfirmDialog
