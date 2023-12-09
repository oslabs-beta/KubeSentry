import * as dotenv from 'dotenv';
dotenv.config();
import { RequestHandler } from 'express';

//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}
//{metrics: '' , values[[time,counter],[]....]}
export const getCustomCounter: RequestHandler = async (_, res, next) => {
  try {
    //interval of data
    let step = '10s';
    //current time
    let end = new Date();
    //range of query (mintues) :1min * 1000ms/s * 60s/min
    let start = new Date();
    start.setMinutes(end.getMinutes() - 10);
    //range query string to append to base prom fetch
    let queryString = `&start=${start.toISOString()}&end=${end.toISOString()}&step=${step}`;
    //fetch prometheus
    const data = await fetch(
      `http://localhost:${process.env.PROMETHEUS_PORT}/api/v1/query_range?query=my_custom_counter${queryString}`
    );
    const result = await data.json(); // TODO: Type
    //set response data object
    res.locals.counterData = {
      metrics: result.data.result[0].metric.__name__,
      value: result.data.result[0].values,
    };
    //go to next middleware
    return next();
  } catch (err) {
    //route to global error
    return next({
      log: `error in promQuery: ${err}`,
      status: 400,
      message: { err: 'could not get prom data' },
    });
  }
};
