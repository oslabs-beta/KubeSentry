'use client';
import React, { useState } from 'react';
import Modal from './PodModal';
import { PodItem } from '../../../types/types';

//Each individual PodCard component which accepts Poditem and a handleClick function as props
export function PodCard(props: { pod: PodItem; handleClick: Function }) {
  //destructuring props
  const {
    name,
    status,
    namespace,
    creationTimestamp,
    dnsPolicy,
    containers,
    restartPolicy,
    hostIP,
    podIP,
    startTime,
  } = props.pod;
  //destructuring handelick
  const handleClick = props.handleClick;

  //state for tracking if the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);

  //function to toggle the modal's open state.
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <article className="relative flex flex-col justify-between h-64 rounded-3xl overflow-hidden shadow-lg border-solid bg-secondaryDark shadow-lg ">
      {/* trash can icon for deleting the pod  */}
      <button
        onClick={() => handleClick(name, namespace)}
        className="absolute top-2 left-2"
      >
        {/* trash can icon  */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute top-1 left-1 w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* displays the text content for pod name, namespace and status  */}
      <div className="mx-8 mt-2">
        <div className="font-bold text-base mb-2 text-center text-slate-100">
          {name}
        </div>
        <p className="text-gray-700 text-sm text-center">{namespace}</p>
        <p className="text-gray-700 text-sm text-center text-green-600">
          {status}
        </p>
      </div>
      {/* button to open the modal for more information  */}
      <div className="flex justify-center w-full pb-4">
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
        >
          More Info
        </button>
      </div>

      {/* Modal Component which is displayed based on the isModalOpen State.  */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <p>PodName: {name}</p>
        <div>NameSpace: {namespace}</div>
        <div>Creation Time Stamp: {creationTimestamp.toString()}</div>
        <div>DNS Policy: {dnsPolicy}</div>
        <div>Number of Containers: {containers}</div>
        <div>Restart Policy: {restartPolicy} </div>
        <div>HostIP: {hostIP}</div>
        <div>PodIP: {podIP} </div>
      </Modal>
    </article>
  );
}
