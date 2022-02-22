import React from "react";
import ReactDom from "react-dom";

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={`modal-overlay ${props.className}`}>
            <div className='modal-content'>{props.children}</div>
        </div>
    );
};

const Modal = (props) => {
    const portalElement = document.getElementById(props.portalElemId);
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDom.createPortal(
                <ModalOverlay className={props.className}>{props.children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;
