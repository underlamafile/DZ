import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Aside from "./Aside";
import AsideFriends from "./AsideFriends";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className="app">
            <Header/>
            <Aside/>
            <Outlet />
            <AsideFriends/>
            <Footer/>
        </div>
    )

}

export default Layout