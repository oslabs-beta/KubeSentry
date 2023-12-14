'use client';
import PodCard from '@/src/app/ui/PodCard';
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
  //make pods cards from the data we get back
  const makePodCards = () => {
    //initialize empty array
    let podsArray = [];
    //for each pod, push a card passing in props for name, namespace, status and the handleclick function
    for (let i = 0; i < pods.length; i++) {
      podsArray.push(
        <div>
          <PodCard
            podName={pods[i]['name']}
            podStatus={pods[i]['status']}
            nameSpace={pods[i]['namespace']}
            handleClick={handleClick}
          />
        </div>
      );
    }
    //return the populated array
    return podsArray;
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

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {makePodCards()}
      </div>
    </div>
  );
}
