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




export default function Page() {
  //set state and function to handle change in search input
  const [searchQuery, setSearchQuery] = useState<string>('');
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }
  //handle button click when user search for something
  function handleSearchButtonClick() {
    //edge case to handle when user leave search query blank
    if (searchQuery === '') return;
    alert(`Searching for ${searchQuery}`);
    setSearchQuery('');
  }

  const style = { width: '50%' };

  return (
    <div className='bg-secondaryDark rounded-md text-white min-h-screen p-8'>
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        onSearch={handleSearchButtonClick}
      />
      <div className='flex flex-column'>
        <div style={style}>
          <TimeSeriesPlot query={'sum(rate(coredns_dns_requests_total[2m]))'} title={'CoreDNS Requests'} />
        </div>
        <div style={style}>
          <TimeSeriesPlot query={'sum(rate(coredns_dns_responses_total[2m]))'} title={'CoreDNS Responses'} />
        </div>
        <div style={style}>
          <TimeSeriesPlot query={MEM_QUERY} title={''} />
        </div>



              </div>
      <div className="flex flow-row justify-center">
        <div style={style}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}
