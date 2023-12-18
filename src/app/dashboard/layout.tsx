'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../src/app/ui/sidebar';
import Banner from '../components/Banner';

export default function Layout({ children }: { children: React.ReactNode }) {
  //the first time user come to the page localstorage is gonna be empty,
  //we are making sure that user can always see the banner the first time he visit and then after he close it and refresh he will not see it again
  const [showbanner, setShowBanner] = useState(false);

  function closeBanner() {
    setShowBanner(false);
    localStorage.setItem('showBanner', 'false');
    console.log(localStorage);
  }

  useEffect(() => {
    //if showbanner doesnt exist, set show banner to true
    //if showbanner does exist, and is true, set showbanner to false
    return setShowBanner(!localStorage.getItem('showBanner'));
  }, []);

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
