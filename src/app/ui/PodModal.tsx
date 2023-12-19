import React from 'react';
import { MouseEventHandler, ReactNode } from 'react';

// Modal component that displays when moreinfo is clicked on podcard
type ModalProps = {
  isOpen: boolean,
  onClose: MouseEventHandler<HTMLButtonElement>,
  children: ReactNode[]
}

export default function Modal(props: ModalProps) {
  //checks if isOpen prop is false, nothing will be rendered if isOpen false
  if (!props.isOpen) return null;

  //when isOpen is true
  return (
    //modal box with the white background
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      {/* section that renders children props  */}
      <div className='bg-white p-6 rounded-lg shadow-xl'>
        {props.children}
        {/* button for closing the modal. When clicked it invokes the 'onClose' function */}
        <button
          onClick={props.onClose}
          className='mt-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded'
        >
          Close
        </button>
      </div>
    </div>
  );
}
