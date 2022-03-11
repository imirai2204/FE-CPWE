export const RequestHeader = {
    checkAuthHeaders: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
    },
    loginHeader: {
        "Content-Type": "application/json",
    },
};
