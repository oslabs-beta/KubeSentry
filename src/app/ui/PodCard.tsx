import React from 'react';

export type PodCardProps = {
  podName: string;
  podStatus: string;
  nameSpace: string;
  handleClick: Function;
};

export function PodCard(props: PodCardProps) {
  const { podName, podStatus, nameSpace, handleClick } = props;
  return (
    <article className="max-w-sm rounded overflow-hidden shadow-lg border-solid bg-secondaryDark shadow-lg ">
      <div className="flex flex-col items-center px-4 py-4 h-64">
        <div className="font-bold text-base mb-2 text-center text-slate-100">
          {podName}
        </div>
        <p className="text-gray-700 text-sm text-center">{nameSpace}</p>
        <p className="text-gray-700 text-sm text-center text-green-600">
          {podStatus}
        </p>
        <button
          onClick={() => handleClick(podName, nameSpace)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-12"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
