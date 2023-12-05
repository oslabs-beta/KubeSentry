"use client";

import {useRef} from "react"
import 'chartjs-adapter-date-fns';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
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
  TimeScale,
  Title,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';
import mock_data from "../../../build/mock_data.json";


function TimeSeriesPlotDisplay ({ data }) {
  const graphTextColor = 'rgba(255,255,255,0.75)';
  const yAxisTitle = 'Counter';
  const chartRef = useRef(null);

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
          maxRotation: 20,
          color: graphTextColor
        },
        grid: {
          display: false,
          color: 'rgba(128, 128, 128, 0.1)'
        },
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: 'rgba(255, 255, 255, 0.702)'
        },
        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss'
          }
        }
      }
    }
  }


  const dataSet = {
    labels: data.time,
    datasets: [{
      label: 'Time Series Dataset',
      data: data.counter,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };

  return ( <Line data={dataSet} ref={chartRef} options={options} /> )
};



export default function TimeSeriesPlot() {
  const {time, counter} = mock_data.counter_series;
  return <TimeSeriesPlotDisplay data={{time, counter}} />
}

