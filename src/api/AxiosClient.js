import axios from "axios";

/** testing with mocklab.io, please make an update when integrating with BE */
// const BASE_URL = "http://cpwe-test.mocklab.io";
/*************************************************************************/

const BASE_URL = "http://f026-116-109-0-36.ngrok.io";

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