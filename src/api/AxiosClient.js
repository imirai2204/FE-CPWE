import axios from "axios";

/** testing with mocklab.io, please make an update when integrating with BE */
// const BASE_URL = "http://cpwe-test.mocklab.io";
/*************************************************************************/

const BASE_URL = "http://c4b7-42-113-114-193.ngrok.io";

const defaultConfig = {
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
};

export const AxiosInstance = axios.create(defaultConfig);

/** Appending the request headers with the comment fields */
AxiosInstance.defaults.headers.common["Content-Type"] = "application/json";
AxiosInstance.defaults.headers.common["x-dsi-restful"] = 1;