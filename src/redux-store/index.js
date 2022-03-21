/** Store setup using configureStore method from redux-toolkit */
import { configureStore } from "@reduxjs/toolkit";

/** Where to import slice reducers */
import authSlice from "./auth/auth.slice";
import userSlice from "./user/user.slice";
import sideBarSlice from "./sidebar/sideBar.slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sideBar: sideBarSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
