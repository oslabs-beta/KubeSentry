require('dotenv').config();
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
//loades the authentication data to our kubernetes client
kc.loadFromDefault();
//kubernetes api client allows
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// const main = async () => {
//     // console.log(podsRes.body.items.map(element => element.status.phase));
//     const metricsClient = new k8s.Metrics(kc);
//     const podMetrics = await k8s.topPods(k8sApi, metricsClient);
//     const nodeMetrics = await k8s.topNodes(k8sApi, metricsClient);
//     console.log(
//       podMetrics.map((element) => [
//         'cpu usage',
//         element.CPU.CurrentUsage,
//         element.Pod.metadata.name,
//       ])
//     );
//     const nodeMem = (
//       (Number(nodeMetrics[0].Memory.RequestTotal) /
//         Number(nodeMetrics[0].Memory.Capacity)) *
//       100
//     ).toFixed(2);
//     console.log(`node memory usage ${nodeMem}%`);
//   } catch (err) {
//     console.error(err);
//   }
// };
// main();

const kubeMetrics = {};

kubeMetrics.getNodeCpu = (req, res) => {};

kubeMetrics.getPods = async (req, res) => {
  try {
    const podsRes = await k8sApi.listPodForAllNamespaces();
    //console.log(podsRes.body.items);
    console.log(
      podsRes.body.items.map((element) => [
        element.metadata.namespace,
        element.metadata.name,
        element.status.phase,
      ])
    );
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = kubeMetrics;
