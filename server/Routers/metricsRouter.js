const express = require('express');
const router = express.Router();

/**********************IMPORT CONTROLLERS**************** */
const kubeMetrics = require('../Controllers/kubeMetrics');
const promMetrics = require('../Controllers/promMetrics');
/**********************ROUTE ACTIONS**************** */
router.get('/prom', (req, res) => {
  fetch(`http://localhost:31302/api/v1/query?query=my_custom_counter`)
    .then((data) => data.json())
    .then((data) => {
      res.locals.data = data.data.result[0];
      console.log(data.data.result[0]);
      res.status(200).json({
        metrics: res.locals.data.metric.__name__,
        value: res.locals.data.value[1],
      });
    })
    .catch(() => res.send('i did not get the data'));
});

router.get(
  '/kubeNodes',
  kubeMetrics.getNodeMetrics,
  kubeMetrics.getNodeMem,
  (req, res) => {
    res.status(200).json(res.locals.result);
  }
);
/**********************EXPORT ROUTER**************** */
module.exports = router;
