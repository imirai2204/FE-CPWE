import axios from "axios";

/** testing with mocklab.io, please make an update when integrating with BE */
const BASE_URL = "http://cpwe-test.mocklab.io";
/*************************************************************************/

// const BASE_URL =
//     "http://04e1-27-64-142-250.ngrok.io";

export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const requestHeader = {
    checkAuth: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
    },
    login: {
        "Content-Type": "application/json",
    },
};
