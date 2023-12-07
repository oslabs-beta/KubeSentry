'use client';
import PodCard from '@/src/app/ui/PodCard';
import React from 'react';
import { useState, useEffect } from 'react';

const fetchData = async () => {
  const response = await fetch('http://localhost:3000/podapi');
  const data = await response.json();
  console.log(data['pods'][0]);
  return data['pods'];
};
export default function Page() {
  const [pods, setPods] = useState([]);
  let podsArray = [];
  const fetchPod = async () => {
    const responseData = await fetchData();
    setPods(responseData);
  };
  
  const handleClick = () => {

  };

  useEffect(() => {
    fetchPod();

    const intervalId = setInterval(fetchPod, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
  return (
    <div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {podsArray}
      </div>
    </div>
  );
}
