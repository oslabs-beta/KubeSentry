require('dotenv').config();
const promMetrics = {};
import { RequestHandler } from 'express';

//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}
//{metrics: '' , values[[time,counter],[]....]}
export const getSomething: RequestHandler = async (_, res, next) => {
  try {
    //interval of data
    let step = '10s';
    //current time
    let end = new Date();
    //range of query (mintues) :1min * 1000ms/s * 60s/min
    const range = 10 * 60000;
    let start = new Date(end.getMilliseconds() - range);
    //range query string to append to base prom fetch
    let queryString = `&start=${start.toISOString()}&end=${end.toISOString()}&step=${step}`;
    //fetch prometheus
    const data = await fetch(
      `http://localhost:31302/api/v1/query_range?query=my_custom_counter${queryString}`
    );
    const result = await data.json();
    //set response data object
    res.locals.data = {
      metrics: result.data.result[0].metric.__name__,
      value: result.data.result[0].values,
    };
    //go to next middleware
    return next();
  } catch (err) {
    //route to global error
    return next({
      log: 'error in promQuery',
      status: 400,
      message: { err: 'could not get prom data' },
    });
  }
};

