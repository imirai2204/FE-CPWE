import { AxiosInstance } from "../../api/AxiosClient";
import { Authen } from "../../api/EndPoint";
import { authActions } from "./auth.slice";
import { userActions } from "../user/user.slice";

export const userLogin = (data) => {
    const { ...body } = data;
    return async (dispatch) => {
        await AxiosInstance.post(Authen.login, body)
            .then((response) => {
                let responseData = response.data.data;
                dispatch(
                    authActions.successLogin({
                        token: responseData.token,
                        isSuccess: true,
                    })
                );
                console.log(responseData.userInfo);
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
