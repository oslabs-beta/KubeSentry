'use client';
import { PromMetricsData } from '../../../types/types';

import 'chartjs-adapter-date-fns';
import { useState, useEffect, useRef } from 'react';

import { PromMetricsData } from '../../../types/types'


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

type timedata = {
  time: Date[],
  counter: number[],
  title: string,
};

 //type error on options param
function TimeSeriesPlotDisplay(data: timedata) {
  const graphTextColor = 'rgba(255,255,255,0.75)';
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
    elements: {
      point: {
        pointStyle: false
      }
    },
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
          // text: data.title,
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
        type: 'time' as const,
        time: {
          unit: 'second' as const,
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
        label: data.title,
        data: data.counter,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return <Line data={dataSet} ref={chartRef} options={options} />;
}

type TimeSeriesParams = {query: string, title: string};
export default function TimeSeriesPlot(params: TimeSeriesParams) {
  const [time, setTime] = useState<Date[]>([]);
  const [counter, setCounter] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(async() => {
      const response = await fetch(`/api/promQuery?query=${params.query}`, {
        cache: 'no-store',
      });
      let jsondata: PromMetricsData = await response.json();
      const { values } = jsondata;
      //only update if we get something back from prometheus
      if (values) {
        values.forEach((el: [number, string]) => {
          time.push(new Date(el[0] * 1000));
          counter.push(Number(el[1]));
        });
        console.log('Got values: ', values)
        setTime(time);
        setCounter(counter);
      }
    }, 5000);
    //cleanup code
    return () => clearInterval(id);
  }, [counter, time]);

  return <>{TimeSeriesPlotDisplay({ time: time, counter: counter, title: params.title })}</>;
}
