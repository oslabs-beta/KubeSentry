'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  /***************************************USE STATE************************************************* */
  const [piedata, setPieData] = useState<{ [key: string]: number }>({});
  const didMountRef = useRef(false);

  /************************************HELPER FUNCTIONS*********************************************** */

  //function to compare if the second object has the value pairs of the first obj
  //@params { [key: string]: number } - obj1, obj2 : objects to do the matching with
  function objCompare(
    obj1: { [key: string]: number },
    obj2: { [key: string]: Number }
  ) {
    //get the list of keys of the obj1
    let keys: string[] = Object.keys(obj1);
    //check the key-value pairs for both objects.
    for (const key of keys) {
      //if a key-value pair is mismatched > return false
      if (obj1[key] !== obj2[key]) return false;
    }
    //all key-value pairs match > return true
    return true;
  }

  //async function to get the data from thebackend
  async function getPieData() {
    try {
      // console.log('start getting data');
      //do not cache the fetch request.
      let fetchdata = await fetch('http://localhost:3000/api', {
        cache: 'no-store',
      });
      //convert to js readable
      let jsondata: { [key: string]: number } = await fetchdata.json();
      //return the js readable data
      return jsondata;
    } catch (err) {
      //error catch
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
      getPieData().then((data) => {
        // console.log(piedata, data);
        if (data) {
          if (!objCompare(data, piedata)) {
            // console.log('updating data');
            setPieData(Object.assign({}, data));
          }
        }
      });
    }, 2000);

    // Clean up the interval when the component is unmounted or when the effect runs again
    return () => {
      // console.log(id);
      clearInterval(id);
    };
    // dependent on the data
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

  //render the pie chart
  return <Doughnut data={chartData} options={options} width={50} height={50} />;
}
