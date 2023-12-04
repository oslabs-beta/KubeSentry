const express = require('express');
const router = express.Router();

/**********************IMPORT CONTROLLERS**************** */
const kubeMetrics = require('../Controllers/kubeMetrics');
const promMetrics = require('../Controllers/promMetrics');
/**********************ROUTE ACTIONS**************** */
//time series query : http://localhost:31302/api/v1/query_range?query=&start=&end=&step
//job query: query?query={job=''}

//MIGHT HAVE TO REFRESH A FEW TIMES TO GET DATA. IT WORKS I SWEAR!!!
//prometheus data for our webapp(for now)
router.get('/prom', promMetrics.getSomething, (req, res) => {
  res.status(200).json(res.locals.data);
});

//Kubernetes node information
router.get(
  '/kubeNodes',
  kubeMetrics.getNodeMetrics,
  kubeMetrics.getNodeMem,
  (req, res) => {
    res.status(200).json(res.locals.result);
  }
);

//kubernetes pod information
router.get('/kubePods', kubeMetrics.getPods, (req, res) => {
  res.status(200).json(res.locals.pods);
});
/**********************EXPORT ROUTER**************** */
module.exports = router;
