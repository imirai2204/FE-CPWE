import React from "react";
import CommentForm from "../UI/Form/CommentForm";

const Comment = ({
    comment,
    replies,
    currentUserId,
    deleteComment,
    activeComment,
    setActiveComment,
    parentId = null,
    addComment,
    updateComment,
}) => {
    const allowReply = Boolean(currentUserId);
    const allowEdit = currentUserId === comment.userId;
    const allowDelete = currentUserId === comment.userId;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReply =
        activeComment &&
        activeComment.type === "Reply" &&
        activeComment.id === comment.id;
    const isEdit =
        activeComment && activeComment.type === "Edit" && activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;

    return (
        <div className='comment'>
            <div className='comment-image-container'>
                <img src='/default-avatar.png' alt='default-avatar' />
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='comment-author'>{comment.username}</div>
                    <div className='comment-date'>{createdAt}</div>
                </div>
                {!isEdit && <div className='comment-text'>{comment.body}</div>}
                {isEdit && (
                    <CommentForm
                        submitLabel='Edit Comment'
                        hasCancelBtn
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className='comment-actions'>
                    {allowReply && (
                        <div
                            className='comment-action'
                            onClick={() =>
                                setActiveComment({ id: comment.id, type: "Reply" })
                            }>
                            Reply
                        </div>
                    )}
                    {allowEdit && (
                        <div
                            className='comment-action'
                            onClick={() =>
                                setActiveComment({ id: comment.id, type: "Edit" })
                            }>
                            Edit
                        </div>
                    )}
                    {allowDelete && (
                        <div
                            className='comment-action'
                            onClick={() => deleteComment(comment.id)}>
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
                                parentId={comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
