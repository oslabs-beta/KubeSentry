import express, {Application, Request, Response, ErrorRequestHandler } from 'express';
import { ServerError } from './types/server-types'
const app:Application = express();
const PORT = 8888;

app.use(express.json());
/**************************IMPORT ROUTERS********************************** */

import metricsRouter from './Routers/metricsRouter';

/**************************SERVING STATIC FILES**************************** */
//NONE BECAUSE WE ARE USING NEXT JS AS A SECONDARY SERVER
/**************************ENPOINT ACTIONS********************************* */

app.use('/metrics', metricsRouter);

/**************************404 HANDLER********************************** */
app.use('*', (_: Request, res: Response): void => {
  res.status(404).send('unknown location');
});
/**************************GLOBAL ERROR HANDLER********************************** */

const errHandler: ErrorRequestHandler = (err, _, res, __) => {
  const defaultErr: ServerError = {
    log: 'error in some middleware',
    status: 500,
    message: { err: 'unexpected error' },
  };
  //using the default error object as base, create a customized error object
  const errorObj: ServerError = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);

}
app.use(errHandler);


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Kube Sentry API server opened on port ${PORT}`);
  });
}

// For testing
export default app;