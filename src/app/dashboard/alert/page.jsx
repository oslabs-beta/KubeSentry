'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [alertdata, setalertData] = useState([]);
  //make a fetch request to the database and get a list of the logs in there with time stamps
  useEffect(() => {
    fetch('http://localhost:3000/dashboard/alert/api')
      .then((data) => data.json())
      .then((data) => {
        //make an array of log components and put it on the page
        let aa = [...data];
        let bb = aa.map((el) => JSON.stringify(el));
        setalertData([...bb]);
      });
  }, []);
  //const alerts = data.map((el) => <h2>{JSON.stringify(el)}</h2>);
  return (
    <div>
      <h1>{alertdata}</h1>
    </div>
  );
}
