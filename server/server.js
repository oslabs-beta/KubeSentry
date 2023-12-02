const express = require('express');
// const promBundle = require('express-prom-bundle');
// const os = require('os');
// const client = require('prom-client');
const app = express();
const PORT = 8888;
const k8s = require('@kubernetes/client-node');

app.use(express.json());
/****************************KUBERNETES *************************** */
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// console.log(kc);
// console.log(k8sApi);

// const main = async () => {
//   try {
//     const podsRes = await k8sApi.listPodForAllNamespaces();
//     console.log(podsRes.body.items);
//     console.log(
//       podsRes.body.items.map((element) => [
//         element.metadata.namespace,
//         element.metadata.name,
//         element.status.phase,
//       ])
//     );
//     // console.log(podsRes.body.items.map(element => element.status.phase));
//     const metricsClient = new k8s.Metrics(kc);
//     const podMetrics = await k8s.topPods(k8sApi, metricsClient);
//     const to = await k8s.topNodes(k8sApi, metricsClient);
//     const nodeMetrics = await metricsClient.getNodeMetrics();
//     console.log(
//       podMetrics.map((element) => [
//         'cpu usage',
//         element.CPU.CurrentUsage,
//         element.Pod.metadata.name,
//       ])
//     );
//     const memUsage = Number(
//       nodeMetrics.items[0].usage.memory.slice(
//         0,
//         nodeMetrics.items[0].usage.memory.length - 2
//       )
//     );
//     console.log(to[0].Memory);
//     const reqTot = Number(to[0].Memory.RequestTotal);
//     const cap = Number(to[0].Memory.Capacity);
//     const nodeMem = memUsage / cap;
//     console.log(`node memory usage ${nodeMem * 100000}%`);
//   } catch (err) {
//     console.error(err);
//   }
// };
// main();
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
