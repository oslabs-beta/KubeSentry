'use client';
import React, { useState, ChangeEvent } from 'react';
import SearchBar from '../components/Searchbar';

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

  return (
    <div className='bg-secondaryDark rounded-md text-white min-h-screen p-8'>
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        onSearch={handleSearchButtonClick}
      />
      <h1 className='text-3xl font-bold mt-4'>Sentry Dashboard</h1>
    </div>
  );
}

/*


// These styles apply to every route in the application
import './styles/globals.css'

  

  return (
    <html lang="en">
      <head>
        <title>Kube Sentry</title>
        <meta name="description" content="Next Generation Kubernetes Monitoring" />
      </head>
      <body>
        <nav>Nav goes here</nav>
        <SearchBar
          value={searchQuery} 
          onChange={handleSearch} 
          onSearch={handleSearchButtonClick}
        />
        <main>{children}</main>
      </body>
    </html>
  )
}

*/
