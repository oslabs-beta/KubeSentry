import { Router, Request, Response } from 'express';
const router = Router();

/**********************IMPORT CONTROLLERS**************** */
import {
  getNodeMetrics,
  getNodeMem,
  getPods,
  deletePod,
  podLogs,
} from '../Controllers/kubeMetrics';
import { getCustomCounter } from '../Controllers/promMetrics';
/**********************ROUTE ACTIONS**************** */
//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}

// MIGHT HAVE TO REFRESH A FEW TIMES TO GET DATA. IT WORKS I SWEAR!!!
// prometheus data for our webapp(for now)
router.get('/prom',
  getCustomCounter,
  (_, res: Response) => {
  res.status(200).json(res.locals.counterData);
});

//Kubernetes node information
router.get('/kubeNodes', getNodeMetrics, getNodeMem, (_, res) => {
  res.status(200).json(res.locals.result);
});

//kubernetes pod information
router.get('/kubePods', getPods, (_, res) => {
  res.status(200).json(res.locals.pods);
});

//delete a pod from cluster
router.get('/delete/:namespace/:name', deletePod, (req, res) => {
  res.status(200).json(res.locals.deletedpod);
});

router.get('/getlogs/:namespace/:name', podLogs, (req, res) => {
  res.status(200).json(res.locals.podLogs);
});
/**********************EXPORT ROUTER**************** */
export default router;
