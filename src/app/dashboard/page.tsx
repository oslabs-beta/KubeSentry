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
      <h1 className='text-3xl font-bold mt-4'>Sentry Dashboard</h1>
      <div style={style}>
        <TimeSeriesPlot />
      </div>
      <div style={style}>
        <LinePlot />
      </div>
      <div style={style}>
        <PieChart />
      </div>
    </div>
  );
}
