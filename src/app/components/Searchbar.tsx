import React, { useState, ChangeEvent } from 'react';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {

  //set state and function to handle change in search input
  const [searchQuery, setSearchQuery] = useState<string>('');
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }
  function handleSubmit(event: React.SyntheticEvent){
    event.preventDefault()
    if (searchQuery === '') return;
    onSearch(searchQuery)
    setSearchQuery('');
  }

  return (
    <div className='search-bar-wrapper'>
      <div className='search-bar flex text-black '>
        <form className='flex w-1/2 p-relative' onSubmit={handleSubmit}>
          <button type='submit'>
            <svg
              width='35'
              height='35'
              viewBox='0 0 15 15'
              fill='white'
              xmlns='http://www.w3.org/2000/svg'
              className='pr-1'
            >
              <path
                d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z'
                fill='white'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <input
            className='w-full pl-2 rounded-md'
            type='text'
            placeholder='search....'
            value={searchQuery}
            onChange={handleSearch}
          />
        </form>
      </div>
    </div>
  );
}
