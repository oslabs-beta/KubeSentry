'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import { AlertCard } from '../../ui/AlertCard';

export default function Page(): ReactElement {
  const [alertdata, setalertData] = useState<any[]>([]);
  //make a fetch request to the database and get a list of the logs in there with time stamps
  useEffect(() => {
    fetch('/dashboard/alert/api')
      .then((data) => data.json())
      .then((data) => {
        //make an array of log components and put it on the page
        let aa = [...data];
        let bb: any[] = aa.map((el) => el.alerts[0]);
        setalertData([...bb]);
      });
  }, []);

  //populate the alertcards array
  const alertCardsArray: any[] = [];
  for (let i = alertdata.length - 1; i >= 0; i--) {
    alertCardsArray.push(<AlertCard alert={alertdata[i]} />);
  }

  return <div>{alertCardsArray}</div>;
}