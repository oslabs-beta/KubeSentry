import React from 'react';

type cardProps = {
  podName: string;
  podStatus: string;
  nameSpace: string;
  handleClick: Function;
};
export default function PodCard(props: cardProps) {
  const { podName, podStatus, nameSpace, handleClick } = props;
  return (
    <div className='flex flex-col justify-between h-64 rounded-3xl overflow-hidden shadow-lg border-solid bg-secondaryDark shadow-lg '>
      <div className='m-4'>
        <div className='font-bold text-base mb-2 text-center text-slate-100'>
          {podName}
        </div>
        <p className='text-gray-700 text-sm text-center'>{nameSpace}</p>
        <p className='text-gray-700 text-sm text-center text-green-600'>
          {podStatus}
        </p>
      </div>
      <div className='flex justify-center w-full pb-4'>
        <button
          onClick={() => handleClick(podName, nameSpace)}
          className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded'
        >
          Delete
        </button>
      </div>
    </div>
  );
}
