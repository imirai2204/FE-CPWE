import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import "../../../styles/style.scss"

function EditPopup(props) {
    const { title, children, openPopup, setOpenpopup } = props;

    return (
        <Dialog open={openPopup} >
            <DialogTitle>
                <div className='editing-form'>
                    <div className='editcloseBtn'>
                        <button onClick={() => { setOpenpopup(false) }}> X </button>
                    </div>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditPopup;
