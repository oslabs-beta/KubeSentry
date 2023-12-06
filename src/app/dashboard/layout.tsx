'use client'
import React, { useState } from 'react';
import Sidebar from '@/src/app/ui/sidebar';
import Banner from '../components/Banner';


export default function Layout({ children }: { children: React.ReactNode }) {
  const [showbanner,setShowBanner] = useState(true)
  function closeBanner(){
    setShowBanner(false)
  }
  return (
    <> 
      {showbanner && <Banner closeBanner={closeBanner}/>}
      <div className='flex h-screen flex-col md:flex-row md:overflow-hidden bg-primaryDark text-slate-400'>
        <div className='w-full flex-none md:w-64'>
          <Sidebar />
        </div>
        <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
      </div>
    </>
    
  );
}
