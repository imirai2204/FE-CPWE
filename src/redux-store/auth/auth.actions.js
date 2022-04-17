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
                if (response.data.code === 1) {
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
                } else {
                    dispatch(
                        authActions.failLogin({
                            errorMessage: response.data.message,
                            errorCode: response.data.code
                        })
                    );
                }
            })
            .catch((error) => {
                if (error && error.response) {
                    dispatch(
                        authActions.failLogin({
                            errorMessage: error.message,
                        })
                    );
                }
            });
    };
};
