'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../src/app/ui/sidebar';
import Banner from '../components/Banner';

export default function Layout({ children }: { children: React.ReactNode }) {
  //the first time user come to the page localstorage is gonna be empty,
  //we are making sure that user can always see the banner the first time he visit and then after he close it and refresh he will not see it again

  /****************USE STATE********************************** */
  //inital showbanner state is false
  const [showbanner, setShowBanner] = useState(false);

  /****************HELPER FUNCTIONS********************************** */
  //toggle the showbanner state and define a local storage key set to false
  function closeBanner() {
    setShowBanner(false);
    localStorage.setItem('showBanner', 'false');
  }

  /****************USE EFFECT********************************** */
  //runs on first render
  useEffect(() => {
    //CLEANUP CODE
    //if showbanner doesnt exist, set show banner to true
    return setShowBanner(!localStorage.getItem('showBanner'));
  }, []);

  /****************COMPONENT RENDER********************************** */
  return (
    <>
      {/* conditional render the banner component based on the showbanner value*/}
      {showbanner && <Banner closeBanner={closeBanner} />}
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-primaryDark text-slate-400">
        <div className="w-full flex-none md:w-60 mt-4">
          <Sidebar />
        </div>
        <div className="flex-grow p-2 m-2 md:overflow-y-auto md:p-2">
          {children}
        </div>
      </div>
    </>
  );
}
