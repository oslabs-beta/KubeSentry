'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(labels = []) {
  const [piedata, setPieData] = useState({});
  const didMountRef = useRef(false);

  //console.log('re-render', intervalID);
  //function to comparte the two objects
  function objCompare(obj1, obj2) {
    let keys = Object.keys(obj1);
    for (const key of keys) {
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  }

  async function getData() {
    try {
      console.log('start getting data');
      let fetchdata = await fetch('http://localhost:3000/api', {
        cache: 'no-store',
      });
      let jsondata = await fetchdata.json();
      return jsondata;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // Skip on initial render
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // Set up interval for your logic (e.g., fetching data)
    const id = setInterval(() => {
      getData().then((data) => {
        console.log(piedata, data);
        if (!objCompare(data, piedata)) {
          // console.log('updating data');
          setPieData(Object.assign({}, data));
        }
      });
    }, 2000);

    // Clean up the interval when the component is unmounted or when the effect runs again
    return () => {
      console.log(id);
      clearInterval(id);
    };
    //  if (intervalID) clearInterval(intervalID);
  }, [piedata]);

  const options = {
    animation: false,
  };

  const chartData = {
    labels: Object.keys(piedata),
    datasets: [
      {
        label: '# of Votes',
        data: Object.keys(piedata).map((c) => piedata[c]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} options={options} width={50} height={50} />;
}
