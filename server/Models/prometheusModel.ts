
import { config } from 'dotenv';
import { PrometheusResponse } from '../types/server-types';
config();
const PROM_HOST = `http://localhost:${process.env.PROMETHEUS_PORT}/api/v1`;

console.log("PROM_HOST: ", PROM_HOST)


//Prometheus time series query : http://url:PORT/api/v1/query_range?query=&start=&end=&step
//           job query:                                 query?query={job=''}

// Build date string for Prometheus
export function buildDateString(range=60, step=60): string {
  // 1 hour range by default
  let stepString = `${step}s`;
  //current time
  const end = new Date();
  //range of query (mintues) :1min * 1000ms/s * 60s/min
  const start = new Date();
  start.setMinutes(end.getMinutes()-range)
  //range query string to append to base prom fetch
  return `start=${start.toISOString()}&end=${end.toISOString()}&step=${stepString}`;
}


// {metrics: '' , values[[time,counter],[]....]}
// fetch from Prometheus
export async function runPromQuery(query: string, dateString: string) {
  const promQuery = `${PROM_HOST}/query_range?query=${query}&${dateString}`;
  // console.log(`Query: ${promQuery}`)
  const data = await fetch( promQuery );
  const result: PrometheusResponse = await data.json();
  return result;
}