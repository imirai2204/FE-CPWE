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

    await AxiosInstance.post(IdeaUrl.comment, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            console.log(body);
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
    console.log(newComment);
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
            console.log(responseData);
            console.log("Fetch Comment Success");
        })
        .catch((error) => {
            errorMessage(error);
        });
    responseData.forEach((data) => {
        allComments.push({
            id: `${data.id}`,
            content: data.content,
            userName: data.createdUser,
            userId: data.userId,
            parent: data.parent !== null ? `${data.parent}` : null,
            createdAt: data.createdDate,
        });
    });
    return allComments;
};
