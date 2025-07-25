import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Header />
      <Toaster />
      <main style={{ minHeight: "70vh" }}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
