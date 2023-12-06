'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default async function PieChart() {
  let data = await fetch('http://localhost:3000/api', { cache: 'no-store' });
  let jsondata = await data.json();
  console.log(jsondata);
  const labels = Object.keys(jsondata);

  const options = {
    animation: false,
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: labels.map((c) => jsondata[c]),
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
