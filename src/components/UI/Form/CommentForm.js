import React, { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    handleCancel,
    initialText = "",
    setAnonymous,
    hasCancelBtn = false,
}) => {
    const [commentText, setCommentText] = useState(initialText);
    const isTextareaEmpty = commentText.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(commentText);
        setCommentText("");
    };

    const onChange = (event) => {
        let text = event.target.value.replace("\n", "");
        setCommentText(text);
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type='checkbox'
                id='anonymous-checkbox'
                onClick={(event) => {
                    setAnonymous(event.target.checked);
                }}
            />
            <label style={{ fontSize: 14, paddingLeft: 5, paddingBottom: 2 }}>Anonymous</label>
            <textarea
                className='comment-form-textarea textarea'
                value={commentText}
                onChange={onChange}
                style={{ width: "100%", resize: "none" }}
                rows={4}
                placeholder={"Add comment..."}
            />
            <button disabled={isTextareaEmpty} className='comment-form-button'>
                {submitLabel}
            </button>
            {hasCancelBtn && (
                <button
                    type='button'
                    className='comment-form-button comment-form-cancel-button'
                    onClick={handleCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default CommentForm;
