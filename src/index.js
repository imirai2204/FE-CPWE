import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SideBarContextProvider } from "./store/side-bar-context";
import { UserCardContextProvider } from "./store/user-card-context";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <SideBarContextProvider>
                <UserCardContextProvider>
                    <App />
                </UserCardContextProvider>
            </SideBarContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
