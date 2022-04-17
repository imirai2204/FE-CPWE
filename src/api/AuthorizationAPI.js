import React from "react";
import { AxiosInstance } from "./AxiosClient";
import { RoleUrl, Authen } from "./EndPoint";

async function AuthorizationAPI(flag, setPermission) {
    await AxiosInstance.get(RoleUrl.authen + flag, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => {
            console.log(res);
            setPermission(res.data.data)
        })
        .catch((error) => {
            setPermission(false)
        });
}
export default AuthorizationAPI;