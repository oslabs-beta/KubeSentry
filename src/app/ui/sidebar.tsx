import React from 'react';
import Link from 'next/link';
const sideBar = () => {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <div>
          <Link
            href='/dashboard'
            // applies display flex
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Home</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/about'
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>About</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/status'
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Status</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/resource'
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Resource</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/report'
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Report</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/alert'
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Alert</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/graph'
            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
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
