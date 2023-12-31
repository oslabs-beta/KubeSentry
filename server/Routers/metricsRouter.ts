import { Router, Request, Response } from 'express';
const router = Router();

/**********************IMPORT CONTROLLERS**************** */
import {
  getNodes,
  getNodeMetrics,
  getNodeMem,
  getPods,
  getRawPods,
  getServices,
  getDeployments,
  deletePod,
  podEvents,
  kubeLogs,
} from '../Controllers/kubeMetrics';
import { getCustomCounter, getPrometheusMetrics } from '../Controllers/promMetrics';
import { KubeGraphData } from '../../types/types'

import { getAlertLogs, addAlertLogs } from '../Controllers/logsController';
/**********************ROUTE ACTIONS**************** */
//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}

// Forward Prometheus data
router.get('/prom',
  getPrometheusMetrics,
  (_, res: Response) => {
  res.status(200).json(res.locals.counterData);
});

// MIGHT HAVE TO REFRESH A FEW TIMES TO GET DATA. IT WORKS I SWEAR!!!
// prometheus data for our webapp(for now)
router.get('/customCounter', getCustomCounter, (_, res: Response) => {
  res.status(200).json(res.locals.counterData);
});

//Kubernetes node information
router.get(
  '/kubeNodes',
  getNodeMetrics,
  getNodeMem,
  (_, res) => {
    res.status(200).json(res.locals.result);
  }
);

router.get(
  '/kubeGraph',
  getNodes,
  getRawPods,
  getServices,
  getDeployments,
  (_, res) => {
    const graph: KubeGraphData   = {
      nodeList: res.locals.nodeList,
      pods: res.locals.rawPods,
      services: res.locals.services,
      deployments: res.locals.deployments
    }
    res.status(200).json(graph);
  }
);

//kubernetes pod information
router.get('/kubePods', getPods, (_, res) => {
  res.status(200).json(res.locals.pods);
});

// delete a pod from cluster
router.get('/delete/:namespace/:name', deletePod, (req, res) => {
  res.status(200).json(res.locals.deletedpod);
});

//get a pods logs and events
router.get('/getEvents/:namespace/:name', podEvents, kubeLogs, (req, res) => {
  res
    .status(200)
    .json({ events: res.locals.podEvents, logs: res.locals.podLogs.body });
});

router.get('/alertlogs', getAlertLogs, (req, res) => {
  res.status(200).json(res.locals.alerts);
});

router.post('/alertlogs', addAlertLogs, (req, res) => {
  res.status(200).json(res.locals.alerts);
});
/**********************EXPORT ROUTER**************** */
export default router;
