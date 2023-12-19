"use client";
import React, { useState } from "react";
import Sidebar from "../ui/sidebar";
import Banner from "../components/Banner";

export default function Layout({ children }: { children: React.ReactNode }) {
  let initialBanner = true;
  //the first time user come to the page localstorage is gonna be empty, we are making sure that user can always see the banner the first time he visit and then after he close it and refresh he will not see it again
  if (localStorage.getItem("userCloseBanner")) {
    initialBanner = false;
  }
  const [showbanner, setShowBanner] = useState(initialBanner);
  function closeBanner() {
    setShowBanner(false);
    localStorage.setItem("userCloseBanner", "true");
  }
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
