import React from "react";
import Modal from "../UI/Modal/Modal";
import SubmitPage from "../../pages/SubmitPage";

const SubmitIdea = (props) => {
    const isDisplay = props.isShowForm;
    return (
        <>
            {isDisplay ? (
                <Modal
                    portalElemId='create-idea-modal'
                    className='idea-submission'
                    onClick={props.closeModalHandler}>
                    <SubmitPage onClose={props.closeModalHandler} />
                </Modal>
            ) : null}
        </>
    );
};

export default SubmitIdea;
