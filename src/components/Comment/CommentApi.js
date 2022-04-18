import { AxiosInstance } from "../../api/AxiosClient";
import { IdeaUrl } from "../../api/EndPoint";

const errorMessage = (error) => {
    if (error && error.response) {
        console.log("Error: ", error);
    }
};

export const createIdeaComment = async (body) => {
    let newComment = {
        id: null,
        content: "",
        username: "",
        userId: "",
        parent: null,
        createdAt: "",
    };

    await AxiosInstance.post(IdeaUrl.createComment, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            const responseData = res.data.data;
            newComment = {
                id: `${responseData.id}`,
                content: responseData.content,
                userName: responseData.createdUser,
                userId: responseData.userId,
                parent: responseData.parent !== null ? `${responseData.parent}` : null,
                createdAt: responseData.createdDate,
            };
        })
        .catch((error) => {
            errorMessage(error);
        });
    return newComment;
};

export const fetchIdeaComments = async (ideaId) => {
    let allComments = [];
    let responseData;
    await AxiosInstance.get(IdeaUrl.fetchComment.concat(`/${ideaId}`), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            responseData = res.data.data;
        })
        .catch((error) => {
            errorMessage(error);
        });
    responseData.forEach((data) => {
        allComments.push({
            id: `${data.id}`,
            content: data.content.replaceAll('"', ""),
            userName: data.createdUser,
            userId: data.userId,
            parent: data.parent !== null ? `${data.parent}` : null,
            createdAt: data.createdDate,
            isAnonymous: data.isAnonymous,
        });
    });
    return allComments;
};

export const editIdeaComment = async (body, commentId) => {
    let updateComment = {
        id: null,
        content: "",
        username: "",
        userId: "",
        parent: null,
        createdAt: "",
    };

    await AxiosInstance.post(IdeaUrl.editComment + commentId, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            const responseData = res.data.data;
            updateComment = {
                id: `${responseData.id}`,
                content: responseData.content,
                userName: responseData.createdUser,
                userId: responseData.userId,
                parent: responseData.parent !== null ? `${responseData.parent}` : null,
                createdAt: responseData.createdDate,
            };
        })
        .catch((error) => {
            errorMessage(error);
        });
    return updateComment;
};

export const deleteIdeaComment = async (commentId) => {
    await AxiosInstance.delete(IdeaUrl.deleteComment + commentId, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).catch((error) => {
        errorMessage(error);
    });
    return null;
};
