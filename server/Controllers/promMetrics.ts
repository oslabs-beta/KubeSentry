import { RequestHandler } from 'express';
import { runPromQuery, buildDateString } from '../Models/prometheusModel'

const defaultRange = buildDateString();

export const getCustomCounter: RequestHandler = async (_, res, next) => {
  try {

    const counter_result = await(runPromQuery('my_custom_counter', defaultRange))
    console.log('counter_result: ', counter_result)

    console.dir(counter_result.data.result);

    // console.log('Fetch result: ', result)
    // TODO: check that we got something usable
    res.locals.counterData = {
      metrics: counter_result.data.result[0].metric.__name__,
      value: counter_result.data.result[0].values,
    };
    //go to next middleware
    console.log('Finished getting data')
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


export const getDNSMetrics: RequestHandler = async (_, res, next) => {

  try {

    const dnsQuery = 'sum(rate(coredns_dns_requests_total[2m]))';
    const dns_result = await runPromQuery(dnsQuery, defaultRange);
    console.log('dns_data: ', dns_result)
    res.locals.counterData = {
      metrics: dns_result.data.result[0].metric.__name__,
      value: dns_result.data.result[0].values,
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
}
