import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "../UI/Form/CommentForm";
import { deleteComment as deleteCommentApi, updateComment as updateCommentApi } from "./dummy-data"; //Dummy comments data for testing

import {
    createIdeaComment as createCommentApi,
    fetchIdeaComments as getCommentsApi,
} from "./CommentApi";

const Comments = ({ currentUserId, currentUserName, isAnonymous, ideaId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);

    const rootComments = backendComments.filter((backendComment) => backendComment.parent === null);

    const getReplies = (commentId) => {
        console.log(backendComments);
        return backendComments
            .filter((backendComment) => backendComment.parent === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    /** Integrate with API from Backend to Create/Update/Delete/Read comments */
    const addComment = (text, parentId) => {
        console.log("Add Comment Action", text, parentId, currentUserId, currentUserName);
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
        getCommentsApi(ideaId).then((data) => {
            setBackendComments(data);
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
