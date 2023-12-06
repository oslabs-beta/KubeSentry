require('dotenv').config();
const kubeMetrics = {};

//creates a Kubernetes cluster object
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
//loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
kc.loadFromDefault();
//creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//mertics-server
const metricsClient = new k8s.Metrics(kc);

//get the node metrics
kubeMetrics.getNodeMetrics = async (req, res, next) => {
  try {
    // console.log(kc);
    res.locals.topNodes = await k8s.topNodes(k8sApi, metricsClient);
    res.locals.nodeMetrics = await metricsClient.getNodeMetrics();
    return next();
  } catch (err) {
    return next({
      log: 'error in getNodeMetrics',
      status: 500,
      message: { err: 'could not get node metrics' },
    });
  }
};

//{name:{memused: , capacity: , percentage: } , name2:{...},...}
kubeMetrics.getNodeMem = (req, res, next) => {
  //get the memory used for each node: [['name', 'mem(in Kb)'],...]
  console.log(res.locals.nodeMetrics.items);
  const memUsed = res.locals.nodeMetrics.items.map((el) => [
    //name of node
    el.metadata.name,
    //memory usage of node comes in as '########ki'
    Number(el.usage.memory.slice(0, el.usage.memory.length - 2)),
  ]);
  console.log(memUsed);
  //get the memory capacity of each node (in Mb)
  const memCap = res.locals.topNodes.map((el) => Number(el.Memory.Capacity));
  //initialize the result object
  res.locals.result = {};
  //populate the result object
  for (let i = 0; i < memUsed.length; i++) {
    res.locals.result[memUsed[i][0]] = {
      'memUsed(kb)': memUsed[i][1],
      capacity: memCap[i][2],
      percentage: ((memUsed[i][1] / memCap[i]) * 100000).toFixed(2),
    };
  }
  return next();
};

//[{namespace:, pod-name: , status: },...]
kubeMetrics.getPods = async (req, res, next) => {
  try {
    //get all the pods from our cluster
    const podsRes = await k8sApi.listPodForAllNamespaces();
    //ARRAY OF ['namespace', 'pod-name', 'status]
    res.locals.pods = { pods: [], nameSpace: new Set() };
    //pod objects
    podsRes.body.items.forEach((el) => {
      res.locals.pods.pods.push({
        namespace: el.metadata.namespace,
        name: el.metadata.name,
        status: el.status.phase,
      });
      res.locals.pods.nameSpace.add(el.metadata.namespace);
      //adding pod state counts
      res.locals.pods[el.status.phase] =
        ++res.locals.pods[el.status.phase] || 1;
    });
    //array of namespaces
    res.locals.pods.nameSpace = [...res.locals.pods.nameSpace];
    return next();
  } catch (err) {
    return next({
      log: 'could not get pods from middleware',
      status: 400,
      message: { err },
    });
  }
};

kubeMetrics.getPodMetrics = async (req, res, next) => {
  try {
    res.locals.topPods = await k8s.topPods(k8sApi, metricsClient);
    response = await k8sApi.readNamespacedPodStatus('mitch-test4', 'default');
    console.log(response.body);

    //console.log(res.locals.podMetrics);
    return next();
  } catch {
    return next({
      log: 'could not get pod Metrics from middleware',
      status: 400,
      message: { err },
    });
  }
};

module.exports = kubeMetrics;
