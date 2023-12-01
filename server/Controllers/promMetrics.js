require('dotenv').config();
const promMetrics = {};

promMetrics.getSomething = (req, res) => {
  // console.log(process.env.NODEPORT);
  fetch(`http://localhost:31302/api/v1/query?query=my_custom_counter`)
    .then((data) => data.json())
    .then((data) => {
      console.log((res.locals.data = data.data.result[0].metric.name));
      return next();
    })
    .catch(() => res.send('i did not get the data'));
};

module.exports = promMetrics;
