import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material'
import "../../../styles/style.scss"
import CloseIcon from '@mui/icons-material/Close';

function ViewListPopUp(props) {
    const { openPopUp, setOpenPopUp, listItem } = props;

    return (
        <Dialog
            open={openPopUp}
            onClose={() => setOpenPopUp(false)}
            scroll={'paper'}
            className={'view-popup'}
        >
            <DialogTitle>
                <CloseIcon
                    className='popup-btnClose'
                    onClick={() => setOpenPopUp(false)}
                    style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#000",
                    }}
                />
                <Typography varient='h3' className='popup-title'>List Permission</Typography>
            </DialogTitle>

            <DialogContent className='popup-listItem'>
                <ul>
                    {listItem.map((item) => {
                        return (
                            <li>{item}</li>
                        );
                    })}
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default ViewListPopUp;
