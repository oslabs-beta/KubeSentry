import { RequestHandler } from 'express';
import { runPromQuery, buildDateString } from '../Models/prometheusModel'

const defaultRange = buildDateString();

export const getCustomCounter: RequestHandler = async (_, res, next) => {
  try {

    const counter_result = await(runPromQuery('my_custom_counter', defaultRange))

    console.dir(counter_result.data.result);
    // console.log('Prometheus query result: ', result)
    // TODO: check whether we got something usable and fail gracefully
    res.locals.counterData = {
      metric: counter_result.data.result[0].metric.__name__,
      values: counter_result.data.result[0].values,
    };
    //go to next middleware
    return next();
  } catch (err) {
    //route to global error
    return next({
      log: `error in promQuery. Error: ${err}`,
      status: 400,
      message: { err: 'could not get prom data' },
    });
  }
};


export const getPrometheusMetrics: RequestHandler = async (req, res, next) => {

  try {
    // const dnsQuery = 'sum(rate(coredns_dns_requests_total[2m]))';
    if (typeof req.query.query != 'string') {
      throw new Error("Unknown value for 'query'")
    }
    const result = await runPromQuery(req.query.query, defaultRange);
    res.locals.counterData = {
      metric: result.data.result[0].metric.__name__,
      values: result.data.result[0].values,
    };
    //go to next middleware
    // console.log("counterData: ", res.locals.counterData);
    return next();
  } catch (err) {
    //route to global error
    return next({
      log: `error in promQuery: ${err}`,
      status: 400,
      message: { err: 'could not get prom data' },
    });
  }
}
