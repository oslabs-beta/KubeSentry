'use client';
import React, { useState, ChangeEvent } from 'react';
import SearchBar from '../components/Searchbar';

import LinePlot from '../charts/LinePlot';
import PieChart from '../charts/PieChart';
import TimeSeriesPlot from '../charts/TimeSeriesPlot';

/*********** Query to send to Prometheus to get the data to show in charts ********/
/*
this query calculates the average CPU usage percentage over the last minute for each instance
,normalized by the number of CPU cores, excluding time spent in idle, iowait, or steal modes.
It provides a way to monitor how much of the CPU's potential is being utilized, which is crucial
for performance monitoring and capacity planning.
*/
const CPU_QUERY = `
(
  (1 - sum without (mode) (rate(node_cpu_seconds_total{mode=~"idle|iowait|steal"}[1m])))
  / ignoring(cpu) group_left  count without (cpu, mode) (node_cpu_seconds_total{ mode="idle"})
)`;

/*********** Get only the average cpu usage ********/
const CPU_AVERAGE_QUERY = `
avg(
  (1 - sum without (mode) (rate(node_cpu_seconds_total{mode=~"idle|iowait|steal"}[1m])))
  / ignoring(cpu) group_left
  count without (cpu, mode) (node_cpu_seconds_total{ mode="idle"})
)`
/*
 this query calculates the average percentage of memory used across all nodes in Prometheus.
 This is a useful metric for understanding the overall memory utilization in your environment,
which can help in capacity planning and identifying potential memory-related issues.
*/
const MEM_QUERY = `
  (1 - avg(node_memory_MemAvailable_bytes)
  / avg(node_memory_MemTotal_bytes))
  * 100
`;
/*
it measures how many seconds of I/O time were spent on average per second during the
given interval. For example:
If the result is 0.5, it means that, on average, the disk spent half a second on I/O operations
for every second in the specified interval.
A value close to 1 would indicate that the disk was almost continuously busy with I/O operations.
In here we are returning an average rate of X milliseconds of disk I/O time per second.
*/

const IO_PER_SECOND_QUERY = `
rate(node_disk_io_time_seconds_total[1m])
`;

/*
The rate of DNS requests (per second) over the past 5 minutes using either
the coredns_dns_request_count_total or coredns_dns_requests_total metrics,
depending on which one is available.
So, the final output of your query will be the total rate of DNS requests
handled per second, grouped by protocol, over the past 5 minutes.
*/
const DNS_RATE_REQUEST =
`
sum(rate(coredns_dns_request_count_total[5m])) by (proto)
or
sum(rate(coredns_dns_requests_total[5m])) by (proto)
`

export default function Page() {

  //handle button click when user search for something
  function handleSearchButtonClick(value: string) {
    //edge case to handle when user leave search query blank
    alert(`Searching for ${value}`);
  }

  const style = { width: '50%' };

  return (
    <div className="bg-secondaryDark rounded-md text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mt-4 mb-8">Sentry Dashboard</h1>
      <div className='mb-8'>
        <SearchBar
          onSearch={handleSearchButtonClick}
        />
      </div>

      <h1 className="text-3xl font-bold mt-4">Sentry Dashboard</h1>

      <div className="dashboard-wrapper flex flex-col">
        <h3>Resource Metrics</h3>
        <div className='flex'>
          <div style={style}>
            <TimeSeriesPlot query={ CPU_QUERY } title={'CPU Usage'} />
          </div>
          <div style={style}>
            <TimeSeriesPlot query={ CPU_AVERAGE_QUERY } title={'AVG CPU Usage'} />
          </div>
          <div style={style}>
            <TimeSeriesPlot query={ MEM_QUERY } title={'RAM Usage'} />
          </div>
        </div>
        <h3>Others</h3>
        <div className='flex'>
          <div style={style}>
            <TimeSeriesPlot query={ IO_PER_SECOND_QUERY } title={'IO per sec'} />
          </div>
        </div>
        <h3>Network Metrics</h3>
        <div className='flex'>
          <div style={style}>
            <TimeSeriesPlot query={ DNS_RATE_REQUEST } title={'DNS Request per 5m'} />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h3>Number of Running/Pending Pods</h3>
        <div style={style}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}
