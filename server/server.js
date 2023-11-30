const express = require('express');
// const promBundle = require('express-prom-bundle');
// const os = require('os');
// const client = require('prom-client');
const app = express();
const PORT = 3000;

app.use(express.json());
/**************************IMPORT ROUTERS********************************** */
const metricsRouter = require('./Routers/metricsRouter');
/**************************SERVING STATIC FILES**************************** */

/**************************ENPOINT ACTIONS********************************* */

//loading the home page
app.get('/', (req, res) => {
  console.log('home');
  res.status(200).send('welcome to my awesome app!');
});

app.use('/metrics', metricsRouter);

/**************************404 HANDLER********************************** */
app.use('*', (req, res) => {
  res.status(404).send('unknown location');
});
/**************************GLOBAL ERROR HANDLER********************************** */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'error in some middleware',
    status: 500,
    message: { err: 'unexpected error' },
  };
  //using the default error object as base, create a customized error object
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
