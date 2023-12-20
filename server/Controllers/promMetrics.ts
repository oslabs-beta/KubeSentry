import { RequestHandler } from 'express';
import { runPromQuery, buildDateString } from '../Models/prometheusModel'

const defaultRange = buildDateString();

export const getCustomCounter: RequestHandler = async (_, res, next) => {
  try {

    const counter_result = await(runPromQuery('my_custom_counter', defaultRange))

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

// Executes the Prometheus query contained in req.query.query.
// Stores the result to res.locals.counterData.
export const getPrometheusMetrics: RequestHandler = async (req, res, next) => {

  try {
    if (typeof req.query.query != 'string') {
      throw new Error("Unknown value for 'query'")
    }
    const result = await runPromQuery(req.query.query, defaultRange);
    res.locals.counterData = {
      metric: result.data.result[0].metric.__name__,
      values: result.data.result[0].values,
    };
    // TODO: check whether we got something usable and fail gracefully

    // go to next middleware
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
