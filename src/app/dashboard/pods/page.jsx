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
  // //make pods cards from the data we get back
  // const makePodCards = () => {
  //   //initialize empty array
  //   let podsArray = [];
  //   //for each pod, push a card passing in props for name, namespace, status and the handleclick function
  //   for (let i = 0; i < pods.length; i++) {
  //     podsArray.push(
  //       <div>
  //         <PodCard
  //           podName={pods[i]['name']}
  //           podStatus={pods[i]['status']}
  //           nameSpace={pods[i]['namespace']}
  //           handleClick={handleClick}
  //         />
  //       </div>
  //     );
  //   }
  //   //return the populated array
  //   return podsArray;
  // };

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

  const categorizePodsByNamespace = (pods) => {
    return pods.reduce((acc, pod) => {
      const namespace = pod.namespace;
      if (!acc[namespace]) {
        acc[namespace] = [];
      }
      acc[namespace].push(pod);
      return acc;
    }, {});
  };

  const [openNamespace, setOpenNamespace] = useState(null);

  const toggleNamespace = (namespace) => {
    setOpenNamespace(openNamespace === namespace ? null : namespace);
  };

  const renderNamespacesWithPods = (categorizedPods) => {
    return Object.keys(categorizedPods).map((namespace) => (
      <div key={namespace}>
        <button
          onClick={() => toggleNamespace(namespace)}
          className='flex items-center'
        >
          <span>{namespace}</span>
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
        </button>
        {openNamespace === namespace && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {categorizedPods[namespace].map((pod) => (
              <PodCard
                key={pod.name}
                podName={pod.name}
                podStatus={pod.status}
                nameSpace={pod.namespace}
                handleClick={handleClick}
                creationTimestamp={pod.creationTimestamp}
                dnsPolicy = {pod.dnsPolicy}
                containers = {pod.containers}
                restartPolicy = {pod.restartPolicy}
                hostIP = {pod.hostIP}
                podIP = {pod.podIP}
                startTime = {pod.startTime}
              />
            ))}
          </div>
        )}
      </div>
    ));
  };
  const categorizedPods = categorizePodsByNamespace(pods);

  return (
    <div>
      <div>{renderNamespacesWithPods(categorizedPods)}</div>
    </div>
  );
}
