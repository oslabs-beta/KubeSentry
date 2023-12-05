import React from 'react';
import Link from 'next/link';
const sideBar = () => {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <div>
          <Link
            href='/dashboard'
            //flex, height 64px, grow: fill entire element space, justify-center: center on main axis, gap: 0.5rem between flexitems, rounded-md: border radius, bg: background color, p: padding 0.75rem,
            //md: on medium size screens and larger (mid-width 768px)
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Home</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/about'
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>About</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/status'
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Status</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/resource'
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Resource</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/report'
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Report</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/alert'
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Alert</p>
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard/graph'
            className='flex h-16 grow items-center justify-center gap-2 rounded-md bg-secondaryDark p-3 text-sm font-medium hover:bg-thirdDark hover:text-white md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <p>Graph</p>
          </Link>
        </div>
        <div className='hidden h-auto w-full grow rounded-md bg-secondaryDark md:block'></div>
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
