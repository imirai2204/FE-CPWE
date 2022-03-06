import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SideBarContextProvider } from "./store/side-bar-context";
import { UserCardContextProvider } from "./store/user-card-context";
import { EditTableContextProvider } from "./store/edit-table-context";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <SideBarContextProvider>
                <UserCardContextProvider>
                    <EditTableContextProvider>
                        <App />
                    </EditTableContextProvider>
                </UserCardContextProvider>
            </SideBarContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
