// components/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="app">
            <Sidebar open={open} />
            <div className="content">
                <Header open={open} setOpen={setOpen} />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;