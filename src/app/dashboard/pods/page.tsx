'use client';
import { PodCard } from '@/src/app/ui/PodCard';
import React from 'react';
import { useState, useEffect } from 'react';

export default function Page() {
  /*******************************USE STATE**************************************** */
  const [pods, setPods] = useState([]); //array of pod objects.
  /*******************************HELPER FUNCTION**************************************** */
  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/podapi');
    const data = await response.json();
    setPods(data['pods']);
  };
  //handle click function to be passed to the pod cards to delete
  const handleClick = async (name, namespace) => {
    //send a delete request to the next.js endpoint
    await fetch('http://localhost:3000/podapi', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, namespace: namespace }),
    });
    return;
  };

  /*******************************USE EFFECT**************************************** */
  //only once on load
  useEffect(() => {
    //setup code
    //get pod data
    fetchData();
    //keep fetching every 3 seconds
    const intervalId = setInterval(fetchData, 3000);
    //cleanup code
    return () => {
      //clear the existing set interval
      clearInterval(intervalId);
    };
  }, []);
  //open icon for namespaces 
  const OpenIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='w-5 h-5'
    >
      <path
        fillRule='evenodd'
        d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
        clipRule='evenodd'
      />
    </svg>
  );

  //close icon for namespaces 
  const CloseIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='w-5 h-5'
    >
      <path
        fillRule='evenodd'
        d='M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z'
        clipRule='evenodd'
      />
    </svg>
  );
//function to categorize pods by their namespace
  const categorizePodsByNamespace = (pods) => {
    //grouping pods based on their namespaces 
    return pods.reduce((acc, pod) => {
      const namespace = pod.namespace;
      if (!acc[namespace]) {
        acc[namespace] = [];
      }
      acc[namespace].push(pod);
      return acc;
    }, {});
  };

  //state to track which namesapce is currently open 
  const [openNamespace, setOpenNamespace] = useState(null);

  //function to toggle the open state of a namespace 
  const toggleNamespace = (namespace) => {
    setOpenNamespace(openNamespace === namespace ? null : namespace);
  };

  //function to render the namespaces with their respective pods 
  const renderNamespacesWithPods = (categorizedPods) => {
    //mapping through each namespace and rendering them with their pods. 
    return Object.keys(categorizedPods).map((namespace) => (
      <div key={namespace}>
        <button
          onClick={() => toggleNamespace(namespace)}
          className='flex items-center'
        >
          <span>{namespace}</span>
          {openNamespace === namespace ? <CloseIcon /> : <OpenIcon />}
        </button>
        {openNamespace === namespace && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {categorizedPods[namespace].map((pod) => (
              <PodCard pod={pod} handleClick={handleClick} />
            ))}
          </div>
        )}
      </div>
    ));
  };
  
  //invoking logic to categorize pods by their namesapces 
  const categorizedPods = categorizePodsByNamespace(pods);

  return (
    <div>
      <div>{renderNamespacesWithPods(categorizedPods)}</div>
    </div>
  );
}
