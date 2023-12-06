'use client';

import 'chartjs-adapter-date-fns';
import { useState, useEffect, useRef } from 'react';

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
import mock_data from '../../../build/mock_data.json';

function TimeSeriesPlotDisplay({ data }) {
  const graphTextColor = 'rgba(255,255,255,0.75)';
  const yAxisTitle = 'Counter';
  const chartRef = useRef(null);

  const options = {
    plugins: {
      legend: {
        labels: {
          color: graphTextColor,
        },
        display: true,
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: graphTextColor,
        },
        grid: {
          display: true,
          color: 'rgba(128, 128, 128, 0.1)',
        },
        display: true,
        title: {
          display: true,
          text: yAxisTitle,
          color: graphTextColor,
        },
      },
      x: {
        ticks: {
          maxRotation: 20,
          color: graphTextColor,
        },
        grid: {
          display: false,
          color: 'rgba(128, 128, 128, 0.1)',
        },
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: 'rgba(255, 255, 255, 0.702)',
        },
        type: 'time',
        time: {
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss',
          },
        },
      },
    },
  };

  const dataSet = {
    labels: data.time,
    datasets: [
      {
        label: 'Time Series Dataset',
        data: data.counter,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return <Line data={dataSet} ref={chartRef} options={options} />;
}

export default function TimeSeriesPlot() {
  const [time, setTime] = useState([]);
  const [counter, setCounter] = useState([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    //skip on initial render
    // if (!didMountRef.current) {
    //   didMountRef.current = true;
    //   return;
    // }
    const id = setInterval(async () => {
      const fetchdata = await fetch('http://localhost:3000/charts/api', {
        cache: 'no-store',
      });
      let jsondata = await fetchdata.json();
      // console.log(jsondata);
      const { value } = jsondata;
      // console.log(value);
      //only update if we get something back from prometheus
      if (value) {
        value.forEach((el) => {
          time.push(el[0]);
          counter.push(el[1]);
        });
        setTime(time);
        setCounter(counter);
      }
    }, 5000);
    //cleanup code
    return () => clearInterval(id);
  }, [counter, time]);

  return <TimeSeriesPlotDisplay data={{ time: time, counter: counter }} />;
}
