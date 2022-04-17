import React, { useState, Fragment } from "react";
import CommentForm from "../UI/Form/CommentForm";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const TEN_MINUTE = 600000;

const Comment = ({
    comment,
    replies,
    currentUserId,
    deleteComment,
    activeComment,
    setActiveComment,
    setAnonymous,
    parent,
    addComment,
    updateComment,
}) => {
    const [isAnonymous, setIsAnonymous] = useState(comment.isAnonymous);
    const userInfo = useSelector((state) => state.user.userInfo);
    const allowReply = Boolean(currentUserId);
    const editTimePass = new Date() - new Date(comment.createdAt) > TEN_MINUTE;
    const allowEdit = currentUserId === comment.userId && !editTimePass;
    const allowDelete = currentUserId === comment.userId;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReply =
        activeComment && activeComment.type === "Reply" && activeComment.id === comment.id;
    const isEdit =
        activeComment && activeComment.type === "Edit" && activeComment.id === comment.id;
    const replyId = parent ?? comment.id;
    const notAllowViewAuthor = currentUserId !== comment.userId;
    const isAdminRole = userInfo.userRole === "ADMIN";

    const getSubReplies = (commentId) => {
        return replies
            .filter((reply) => reply.parent === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    return (
        <div className='comment'>
            <div className='comment-image-container'>
                <img src='/default-avatar.png' alt='default-avatar' />
            </div>
            <div className='comment-right-part'>
                <div className='comment-content'>
                    <div className='author-comment'>
                        <div className='author-info'>
                            <label className='author-name'>
                                {isAdminRole && isAnonymous === true ? (
                                    <VisibilityIcon
                                        className='author-view'
                                        onClick={() => setIsAnonymous(false)}
                                    />
                                ) : (
                                    <Fragment />
                                )}
                                {isAdminRole && isAnonymous === false ? (
                                    <VisibilityOffIcon
                                        className='author-view'
                                        onClick={() => setIsAnonymous(true)}
                                    />
                                ) : (
                                    <Fragment />
                                )}
                                {isAnonymous && !notAllowViewAuthor && !isAdminRole && (
                                    <label className='author-user-name-active'>
                                        {comment.userName}
                                    </label>
                                )}
                                {!isAnonymous && !notAllowViewAuthor && !isAdminRole && (
                                    <label className='author-user-name-active'>
                                        {comment.userName}
                                    </label>
                                )}
                                {!isAnonymous && notAllowViewAuthor && !isAdminRole && (
                                    <label className='author-name-user'>Anonymous</label>
                                )}
                                {isAnonymous && isAdminRole && (
                                    <label className='author-name'>Anonymous</label>
                                )}
                                {!isAnonymous && isAdminRole && (
                                    <label className='author-name-active'>{comment.userName}</label>
                                )}
                                <div className='comment-date'>{createdAt}</div>
                            </label>
                        </div>
                    </div>
                </div>
                {!isEdit && <div className='comment-text'>{comment.content}</div>}
                {isEdit && (
                    <CommentForm
                        submitLabel='Edit Comment'
                        hasCancelBtn
                        initialText={comment.content}
                        handleSubmit={(text) => {
                            updateComment(text, comment.id);
                            console.log(text);
                        }}
                        handleCancel={() => setActiveComment(null)}
                        setAnonymous={setAnonymous}
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
                        setAnonymous={setAnonymous}
                    />
                )}
                {replies.length > 0 && (
                    <div className='replies'>
                        {replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                replies={getSubReplies(reply.id)} //Provide Empty Array as we only allow comment with 2 levels.
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                addComment={addComment}
                                updateComment={updateComment}
                                parent={comment.id}
                                setAnonymous={setAnonymous}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
