import React, { Children } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = ({children}) => {
    return (
        <div className="bg-[#1f212d] text-white ">
            <Header />
            <div className="bg-gray-200">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout