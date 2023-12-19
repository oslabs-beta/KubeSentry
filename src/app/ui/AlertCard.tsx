import React, { ReactElement } from 'react';

export function AlertCard({ alert }: { alert: any }): ReactElement {
  console.log(alert);
  return (
    <article className="relative flex flex-col justify-between rounded-2xl shadow-lg border-solid bg-gray-800 shadow-lg mb-2 px-2 text-sky-600">
      <p>
        {'('}
        {alert.startsAt}
        {') '}
        Name: <yt>{alert.labels.alertname}</yt>
        <br></br>
        Status:
        {/* conditional coloring based on status */}
        <b
          className={
            alert.status == 'resolved' ? 'text-green-600' : 'text-red-600'
          }
        >
          {' '}
          {alert.status.toUpperCase()}{' '}
        </b>
        Instance: {alert.labels.instance}
      </p>
      <p>
        Summary: <yt>{alert.annotations.summary}</yt>
      </p>
    </article>
  );
}
