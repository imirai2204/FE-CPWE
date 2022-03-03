import React from "react";
import ReactDom from "react-dom";

const Backdrop = (props) => {
    return <div className='backdrop' onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={`modal-overlay ${props.className}`}>
            <div className='modal-content'>{props.children}</div>
        </div>
    );
};

const Modal = ({ children, portalElemId, onClick, className }) => {
    const portalElement = document.getElementById(portalElemId);
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClick={onClick} />, portalElement)}
            {ReactDom.createPortal(
                <ModalOverlay className={className}>{children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;
