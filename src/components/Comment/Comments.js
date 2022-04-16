import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "../UI/Form/CommentForm";
import {
    getComments as getCommentsApi,
    // createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi,
} from "./dummy-data"; //Dummy comments data for testing

import {
    createIdeaComment as createCommentApi,
    fetchIdeaComments as getCommentsApiReal,
} from "./CommentApi";

const Comments = ({ currentUserId, currentUserName, isAnonymous, ideaId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );

    const getReplies = (commentId) => {
        return backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    /** Integrate with API from Backend to Create/Update/Delete/Read comments */
    const addComment = (text, parentId) => {
        console.log("addComment", text, parentId, currentUserId, currentUserName);
        const body = {
            parentId: parentId ?? null,
            ideaId,
            userId: currentUserId,
            content: text,
            isAnonymous: isAnonymous ?? true,
        };
        createCommentApi(body).then((comment) => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId) => {
        if (window.confirm("Are you sure to delete this comment?")) {
            deleteCommentApi(commentId).then(() => {
                const latestBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(latestBackendComments);
            });
        }
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    useEffect(() => {
        /** Integrate with API from Backend
         * current code is for testing only
         */
        getCommentsApi().then((data) => {
            setBackendComments(data);
        });
        getCommentsApiReal(ideaId).then((data) => {
            console.log(data);
        });
    }, []);

    return (
        <div className='comments'>
            <CommentForm
                submitLabel='Add Comment'
                handleSubmit={addComment}
                currentUserId={currentUserId}
            />
            <div className='comments-container'>
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                        updateComment={updateComment}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;
