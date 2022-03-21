import { AxiosInstance, requestHeader } from "../../api/AxiosClient";
import { Authen } from "../../api/EndPoint";
import { authActions } from "./auth.slice";
import { userActions } from "../user/user.slice";

export const userLogin = (data) => {
    const { ...body } = data;
    return async (dispatch) => {
        await AxiosInstance.get(Authen.login, body, requestHeader.login)
            .then((response) => {
                let responseData = response.data;
                console.log(responseData);
                dispatch(
                    authActions.successLogin({
                        token: responseData.token,
                        isSuccess: true,
                    })
                );
                dispatch(
                    userActions.updateUserInfo({
                        userInfo: responseData.userInfo,
                    })
                );
            })
            .catch((error) => {
                dispatch(authActions.failLogin(error.message));
                console.log(error.message);
            });
    };
};
