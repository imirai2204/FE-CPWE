import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux-store/index";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
