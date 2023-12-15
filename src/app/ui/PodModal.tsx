import React from 'react';


export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-xl'>
        {children}
        <button
          onClick={onClose}
          className='mt-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded'
        >
          Close
        </button>
      </div>
    </div>
  );
}
