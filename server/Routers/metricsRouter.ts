import { Router, Request, Response } from 'express';
const router = Router();

/**********************IMPORT CONTROLLERS**************** */
import {
  getNodeMetrics,
  getNodeMem,
  getPods,
  deletePod,
} from '../Controllers/kubeMetrics';
import { getSomething } from '../Controllers/promMetrics';
/**********************ROUTE ACTIONS**************** */
//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}

//MIGHT HAVE TO REFRESH A FEW TIMES TO GET DATA. IT WORKS I SWEAR!!!
//prometheus data for our webapp(for now)
router.get('/prom', getSomething, (_, res: Response) => {
  res.status(200).json(res.locals.data);
});

//Kubernetes node information
router.get('/kubeNodes', getNodeMetrics, getNodeMem, (_, res) => {
  res.status(200).json(res.locals.result);
});

//kubernetes pod information
router.get('/kubePods', getPods, (_, res) => {
  res.status(200).json(res.locals.pods);
});

router.get('/delete/:namespace/:name', deletePod, (req, res) => {
  res.status(200).json(res.locals.deletedpod);
});
/**********************EXPORT ROUTER**************** */
export default router;
