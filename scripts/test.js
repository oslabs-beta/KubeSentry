const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const metricsClient = new k8s.Metrics(kc);

async function testk8s() {
  // loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
  // creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
  console.log('k8sApi: ', k8sApi);
  //metrics-server
  // console.log('metricsClient: ', metricsClient);
  const nodeMetrics = await metricsClient.getNodeMetrics();
  // console.log('nodeMetrics: ', nodeMetrics);
  console.log('topNodes: ', await k8s.topNodes(k8sApi));
  console.log('topPods: ', await k8s.topPods(k8sApi));
  // console.log("nodes: ", (await k8sApi.listNode()).body)
  // console.log("nodes: ", (await k8sApi.listPod()).body)
}

(async () => {
  await testk8s();
  process.exit();
})();
