import React, { useEffect } from "react";
// @ts-ignore: missing type declarations for 'aos'
import AOS from "aos";
import "aos/dist/aos.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      {/* Cursor Effects */}
      <div className="cursor"></div>
      <div className="cursor-follower"></div>

      {/* Progress Bar */}
      <div className="progress-bar"></div>

      {/* Main Content */}
      <div className="app-container">{children}</div>
    </>
  );
};

export default Layout;
