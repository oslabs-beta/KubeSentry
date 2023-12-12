import { Router, Request, Response } from 'express';
const router = Router();

/**********************IMPORT CONTROLLERS**************** */
import {
  getTopNodes,
  getNodeMetrics,
  getNodeMem,
  getPods,
  getServices,
  getDeployments,
  deletePod,
} from '../Controllers/kubeMetrics';
import { getCustomCounter, getPrometheusMetrics } from '../Controllers/promMetrics';
/**********************ROUTE ACTIONS**************** */
//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}

// Forward Prometheus data
router.get('/prom',
  getPrometheusMetrics,
  (_, res: Response) => {
  res.status(200).json(res.locals.counterData);
});

//Kubernetes node information
router.get('/kubeNodes',
  getTopNodes,
  getNodeMetrics,
  getNodeMem,
  (_, res) => {
  res.status(200).json(res.locals.result);
});

router.get('/kubeGraph',
  getTopNodes,
  getPods,
  getServices,
  getDeployments,
  (_, res) => {
    res.sendStatus(401);
})

//kubernetes pod information
router.get('/kubePods', getPods, (_, res) => {
  res.status(200).json(res.locals.pods);
});

//delete a pod from cluster
router.get('/delete/:namespace/:name', deletePod, (req, res) => {
  res.status(200).json(res.locals.deletedpod);
});

/**********************EXPORT ROUTER**************** */
export default router;
