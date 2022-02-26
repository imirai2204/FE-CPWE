import React from "react";
import Modal from "../UI/Modal/Modal";
import { Button } from "../UI/Button/Button";

const SubmitIdea = (props) => {
    return (
        <Modal
            portalElemId='create-idea-modal'
            className='idea-submission'
            onClick={props.closeModalHandler}>
            <Button onClick={props.closeModalHandler} buttonStyle='btn--modal'>
                Close Modal
            </Button>
        </Modal>
    );
};

export default SubmitIdea;
