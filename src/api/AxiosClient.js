import axios from "axios";

/** testing with mocklab.io, please make an update when integrating with BE */
// const BASE_URL = "http://cpwe-test.mocklab.io";
/*************************************************************************/

<<<<<<< HEAD
HEAD
const BASE_URL = "http://19fd-42-112-228-184.ngrok.io";
=======
const BASE_URL = "http://2c61-42-112-228-184.ngrok.io";
>>>>>>> cde1f9e865aea1fc976fc714debcbbd9f95b7d82

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
