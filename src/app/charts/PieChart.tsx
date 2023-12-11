'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { objCompare } from '../../util/utils'
import { PieChartData } from '../../../types/types'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  /***************************************USE STATE************************************************* */
  const [piedata, setPieData] = useState<PieChartData>({});
  const didMountRef = useRef(false);

  /************************************HELPER FUNCTIONS*********************************************** */


  //async function to get the data from thebackend
  async function getPieData() {
    try {
      // console.log('start getting data');
      //do not cache the fetch request.
      let response = await fetch('/api', {
        cache: 'no-store',
      });
      //convert to js readable
      let jsondata: PieChartData = await response.json();
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
        if (data) {
          if (!objCompare(data, piedata)) {
            setPieData(Object.assign({}, data));
          }
        }
      });
    }, 2000);

    // Clean up the interval when the component is unmounted or when the effect runs again
    return () => {
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
