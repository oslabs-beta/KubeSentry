'use client';
import React, { useState, ChangeEvent } from 'react';
import SearchBar from '../components/Searchbar';

import LinePlot from '../charts/LinePlot';
import PieChart from '../charts/PieChart';
import TimeSeriesPlot from '../charts/TimeSeriesPlot';

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
      </div>
      <div className='flex flow-row justify-center'>
        <div style={style}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}
