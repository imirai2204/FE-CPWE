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
    const { openPopUp, setOpenPopUp } = props;

    return (
        <Dialog
            open={openPopUp.isOpen}
            onClose={() => setOpenPopUp({ ...openPopUp, isOpen: false })}
            scroll={'paper'}
            className={'view-popup'}
        >
            <DialogTitle>
                <CloseIcon
                    className='popup-btnClose'
                    onClick={() => setOpenPopUp({ ...openPopUp, isOpen: false })}
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
                    {openPopUp.itemList.map((item) => {
                        return (
                            <>
                                <li key={item.permissionId}>{item.permissionId}. {item.permissionName}</li>
                            </>
                        );
                    })}
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default ViewListPopUp;
