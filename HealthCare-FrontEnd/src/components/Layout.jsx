import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({open, setOpen, user }) {
    return (
        <div className="app">
            <Sidebar open={open} setOpen={setOpen} user={user}  />
            <div className="content">
                <Header open={open} setOpen={setOpen} user={user} />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;