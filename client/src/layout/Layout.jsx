import React, { Children } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = ({children}) => {
    return (
        <div className="bg-[#1f212d] text-white ">
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout