import express, {Request, Response, NextFunction, RequestHandler } from 'express';
import { ServerError } from "../types"
const app = express();
const PORT = 8888;

app.use(express.json());
/**************************IMPORT ROUTERS********************************** */

const metricsRouter = require('./Routers/metricsRouter');

/**************************SERVING STATIC FILES**************************** */
//NONE BECAUSE WE ARE USING NEXT JS AS A SECONDARY SERVER
/**************************ENPOINT ACTIONS********************************* */

app.use('/metrics', metricsRouter);

/**************************404 HANDLER********************************** */
app.use('*', (_: Request, res: Response): void => {
  res.status(404).send('unknown location');
});
/**************************GLOBAL ERROR HANDLER********************************** */
app.use((err: ServerError, _: Request, res: Response, __: NextFunction): void => {
  const defaultErr: ServerError = {
    log: 'error in some middleware',
    status: 500,
    message: { err: 'unexpected error' },
  };
  //using the default error object as base, create a customized error object
  const errorObj: ServerError = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
