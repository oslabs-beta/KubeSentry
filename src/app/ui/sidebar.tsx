import React from 'react';
import Link from 'next/link';
const sideBar = () => {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <div>
          <Link href='/dashboard'>
            <p className='ptags'>Home</p>
          </Link>
        </div>
        <div>
          <Link href='/dashboard/about'>
            <p>About</p>
          </Link>
        </div>
        <div>
          <Link href='/dashboard/status'>
            <p>Status</p>
          </Link>
        </div>
        <div>
          <Link href='/dashboard/resource'>
            <p>Resource</p>
          </Link>
        </div>
        <div>
          <Link href='/dashboard/report'>
            <p>Report</p>
          </Link>
        </div>
        <div>
          <Link href='/dashboard/alert'>
            <p>Alert</p>
          </Link>
        </div>
        <div>
          <Link href='/dashboard/graph'>
            <p>Graph</p>
          </Link>
        </div>
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
      </div>
    </div>
  );
};

export default sideBar;

// return (
//   <div>
//     <Link href='/dashboard'>Dashboard</Link>
//     <Link href='/dashboard'>Graphs</Link>
//     <Link href='/dasbhoard'>Settings</Link>
//   </div>
// );
