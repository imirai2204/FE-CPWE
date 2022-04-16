import React from "react";
import CommentForm from "../UI/Form/CommentForm";

const TEN_MINUTE = 60000;

const Comment = ({
    comment,
    replies,
    currentUserId,
    deleteComment,
    activeComment,
    setActiveComment,
    parent = null,
    addComment,
    updateComment,
}) => {
    const allowReply = Boolean(currentUserId);
    const editTimePass = new Date() - new Date(comment.createdAt) > TEN_MINUTE;
    const allowEdit = currentUserId === comment.userId && !editTimePass;
    const allowDelete = currentUserId === comment.userId;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReply =
        activeComment && activeComment.type === "Reply" && activeComment.id === comment.id;
    const isEdit =
        activeComment && activeComment.type === "Edit" && activeComment.id === comment.id;
    const replyId = parent ? parent : comment.id;

    return (
        <div className='comment'>
            <div className='comment-image-container'>
                <img src='/default-avatar.png' alt='default-avatar' />
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>{comment.userName}</div>
                    <div className='comment-date'>{createdAt}</div>
                </div>
                {!isEdit && <div className='comment-text'>{comment.content}</div>}
                {isEdit && (
                    <CommentForm
                        submitLabel='Edit Comment'
                        hasCancelBtn
                        initialText={comment.content}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className='comment-actions'>
                    {allowReply && (
                        <div
                            className='comment-action'
                            onClick={() => {
                                console.log(comment.id);
                                setActiveComment({ id: comment.id, type: "Reply" });
                            }}>
                            Reply
                        </div>
                    )}
                    {allowEdit && (
                        <div
                            className='comment-action'
                            onClick={() => setActiveComment({ id: comment.id, type: "Edit" })}>
                            Edit
                        </div>
                    )}
                    {allowDelete && (
                        <div className='comment-action' onClick={() => deleteComment(comment.id)}>
                            Delete
                        </div>
                    )}
                </div>
                {isReply && (
                    <CommentForm
                        submitLabel='Reply'
                        handleSubmit={(text) => addComment(text, replyId)}
                    />
                )}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                replies={[]} //Provide Empty Array as we only allow comment with 2 levels.
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                updateComment={updateComment}
                                parent={comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
