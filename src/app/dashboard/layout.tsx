"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/src/app/ui/sidebar";
import Banner from "../components/Banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  let initialBanner = false;
  //the first time user come to the page localstorage is gonna be empty.
  // we are making sure that user can always see the banner the first time he visit and then after he close it and refresh he will not see it again

  // localStorage is only defined on the client.
  // Wrap in useEffect to ensure it doesn't run on the server.
  let closeBanner = () => {}; // Dummy function

  useEffect(() => {
    initialBanner = true;
    if (localStorage.getItem("userCloseBanner")) {
      initialBanner = false;
    }
    closeBanner = () => {
      setShowBanner(false);
      localStorage.setItem("userCloseBanner", "true");
    }
    setShowBanner(initialBanner);
  }, [])

  const [showbanner, setShowBanner] = useState(initialBanner);
  return (
    <>
      {showbanner && <Banner closeBanner={closeBanner} />}
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-primaryDark text-slate-400">
        <div className="w-full flex-none md:w-64 mt-8">
          <Sidebar />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
