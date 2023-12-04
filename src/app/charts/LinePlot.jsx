"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';
import mock_data from "../../../build/mock_data.json";


function LinePlotDisplay ({ data }) {
  const graphTextColor = 'rgba(255,255,255,0.75)';
  const yAxisTitle = 'Y Axis';

  const options = {
    plugins: {
      legend: {
        labels: {
          color: graphTextColor
        },
        display: true
      }
    },
    responsive: true,
    animation: false,
    scales: {
      y: {
        ticks: {
          color: graphTextColor
        },
        grid: {
          display: true,
          color: 'rgba(128, 128, 128, 0.1)'
        },
        display: true,
        title: {
          display: true,
          text: yAxisTitle,
          color: graphTextColor
        }
      },
      x: {
        ticks: {
          color: graphTextColor
        },
        grid: {
          display: false,
          color: 'rgba(128, 128, 128, 0.1)'
        },
        display: true,
        title: {
          display: true,
          text: `X axis`,
          color: 'rgba(255, 255, 255, 0.702)'
        }
      }
    }
  }


  const dataSet = {
    labels: [...data.keys()],
    datasets: [{
      label: 'Sequential Dataset',
      data: data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };

  return ( <Line data={dataSet} options={options} /> )
};



export default function LinePlot() {
  // Pull in data from somewhere else
  return <LinePlotDisplay data={mock_data.ram_usage} />

}

