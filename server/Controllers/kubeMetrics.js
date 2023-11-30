require('dotenv').config()
const kubeMetrics = {};

kubeMetrics.getSomething = (req, res) => {
  fetch(`http://localhost:${process.env.NODEPORT}/api/v1/query?query=my_custom_counter`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data.data.result[0].metric.name);
      return res.send(`i got the data${data.data.result}`);
    })
    .catch(() => res.send('i did not get the data'));
};

module.exports = kubeMetrics;
