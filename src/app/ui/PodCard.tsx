import React from 'react';

type cardProps = { podName: string };
export default function PodCard(props: cardProps) {
  const { podName } = props;
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg border-solid bg-secondaryDark shadow-lg '>
      <div className='px-6 py-4 '>
        <div className='font-bold text-xl mb-2'>{podName}</div>
        <p className='text-gray-700 text-base'>Pod Status</p>
      </div>
    </div>
  );
}
