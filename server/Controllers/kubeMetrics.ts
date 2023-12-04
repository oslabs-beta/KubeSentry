require('dotenv').config();
import { RequestHandler } from 'express';



//creates a Kubernetes cluster object
import { KubeConfig, CoreV1Api, Metrics, topNodes, topPods, SingleNodeMetrics, V1Pod, NodeStatus, V1PodStatus } from '@kubernetes/client-node';
const kc = new KubeConfig();
//loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
kc.loadFromDefault();
//creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
const k8sApi = kc.makeApiClient(CoreV1Api);
//mertics-server
const metricsClient = new Metrics(kc);

//get the node metrics
export const getNodeMetrics: RequestHandler = async(_, res, next) => {
  try {
    // console.log(kc);
    res.locals.topNodes = await topNodes(k8sApi);
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
export const getNodeMem: RequestHandler = async (_, res, next) => {
  //get the memory used for each node: [['name', 'mem(in Kb)'],...]
  // console.log(res.locals.nodeMetrics.items);
  const memUsed = res.locals.nodeMetrics.items.map((el: SingleNodeMetrics) => [
    //name of node
    el.metadata.name,
    //memory usage of node comes in as '########ki'
    Number(el.usage.memory.slice(0, el.usage.memory.length - 2)),
  ]);
  console.log(memUsed);
  //get the memory capacity of each node (in Mb)
  const memCap = res.locals.topNodes.map((el: NodeStatus) => Number(el.Memory.Capacity));
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
export const getPods: RequestHandler = async (_, res, next) => {
  try {
    //get all the pods from our cluster
    const podsRes = await k8sApi.listPodForAllNamespaces();
    //ARRAY OF ['namespace', 'pod-name', 'status]
    res.locals.pods = { pods: [], nameSpace: new Set() };
    //pod objects
    podsRes.body.items.forEach((el: V1Pod) => {

      if (el.metadata && el.status) {
        if (el.status.phase !== undefined) {
          const status: V1PodStatus = el.status.phase;
        } status = el.status.phase?.toString();
        // Todo: find a better way to handle this?
        res.locals.pods.pods.push({
          namespace: el.metadata.namespace,
          name: el.metadata.name,
          status,
        });
        res.locals.pods.nameSpace.add(el.metadata.namespace);
        //adding pod state counts
        res.locals.pods[status] =
          ++res.locals.pods[status] || 1;
      }
    else {
      // Not handled
      return;
    }
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

export const getPodMetrics: RequestHandler = async (_, res, next) => {
  try {
    res.locals.topPods = await topPods(k8sApi, metricsClient);
    res.locals.podMetrics = await metricsClient.getPodMetrics();
    return next();
  } catch (err) {
    return next({
      log: 'could not get pod Metrics from middleware',
      status: 400,
      message: { err },
    });
  }
};
