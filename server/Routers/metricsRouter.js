const express = require('express');
const router = express.Router();

/**********************IMPORT CONTROLLERS**************** */
const kubeMetrics = import('../Controllers/kubeMetrics');
const promMetrics = import('../Controllers/promMetrics');
/**********************ROUTE ACTIONS**************** */
router.get('/', (req, res) => {
  res.send('got some metrics');
});

/**********************EXPORT ROUTER**************** */
module.exports = router;
