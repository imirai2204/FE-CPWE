import { AxiosInstance } from "../../api/AxiosClient";
import { IdeaUrl } from "../../api/EndPoint";

export const createIdeaComment = async (body) => {
    await AxiosInstance.post(IdeaUrl.comment, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            };
            console.log("Create success");
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
};

export const fetchIdeaComments = async (ideaId) => {
    let responseData = [];
    await AxiosInstance.get(IdeaUrl.fetchComment.concat(`/${ideaId}`), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            responseData = res.data.data;
            var errorData = {
                code: res.data.code,
                message: res.data.message,
            };
            console.log("Fetch Comment Success");
        })
        .catch((error) => {
            if (error && error.response) {
                console.log("Error: ", error);
            }
        });
    return responseData;
};
