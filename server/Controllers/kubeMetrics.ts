require('dotenv').config();
import { RequestHandler } from 'express';
import { PodStatusCount } from '../types/server-types';
import { PodItem } from '../../types/types';

import {
  KubeConfig,
  CoreV1Api,
  Metrics,
  topNodes,
  topPods,
  NodeMetric,
  V1Pod,
  NodeStatus,
} from '@kubernetes/client-node';

//creates a Kubernetes cluster object
const kc = new KubeConfig();
//loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
kc.loadFromDefault();
//creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
const k8sApi = kc.makeApiClient(CoreV1Api);
//mertics-server
const metricsClient = new Metrics(kc);

//get the node metrics
export const getNodeMetrics: RequestHandler = async (_, res, next) => {
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
  const memUsed: [string, number][] = res.locals.nodeMetrics.items.map(
    (el: NodeMetric) => [
      //name of node
      el.metadata.name,
      //memory usage of node comes in as '########ki'
      Number(el.usage.memory.slice(0, el.usage.memory.length - 2)),
    ]
  );
  console.log(memUsed);
  //get the memory capacity of each node (in Mb)
  const memCap = res.locals.topNodes.map((el: NodeStatus) =>
    Number(el.Memory.Capacity)
  );
  //initialize the result object
  res.locals.nodeMem = {};
  //populate the result object
  for (let i = 0; i < memUsed.length; i++) {
    res.locals.nodeMem[memUsed[i][0]] = {
      'memUsed(kb)': memUsed[i][1],
      capacity: memCap[i],
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
    const resPods: PodItem[] = [];
    const statusCount: PodStatusCount = {};
    const nameSpaces = new Set<string>();
    //pod objects
    podsRes.body.items.forEach((el: V1Pod) => {
      if (el.metadata && el.status) {
        // Todo: find a better way to handle undefined values
        const status: string = el.status.phase!;
        // Keep track of pod counts by status bucket
        statusCount[status] = ++statusCount[status] || 1;
        //running containers
        const containers = el.spec!.containers!;
        const amtOfContainers = containers.length;
        resPods.push({
          namespace: el.metadata.namespace!,
          name: el.metadata.name!,
          status,
          creationTimestamp: el.metadata.creationTimestamp!,
          dnsPolicy: el.spec!.dnsPolicy!,
          containers: amtOfContainers,
          restartPolicy: el.spec!.restartPolicy!,
          hostIP: el.status!.hostIP!,
          podIP: el.status!.podIP!,
        });
        nameSpaces.add(el.metadata.namespace || 'default');
      } else {
        // Not handled
        return;
      }
    });

    //array of namespaces
    res.locals.pods = {
      pods: resPods,
      nameSpace: [...nameSpaces],
      statusCount,
    };
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

export const deletePod: RequestHandler = async (req, res, next) => {
  try {
    //extract name and namespace from endpoint
    const { name, namespace } = req.params;
    //delete pod using kubernetes client method
    res.locals.deletedpod = await k8sApi.deleteNamespacedPod(
      name,
      namespace,
      undefined,
      undefined,
      2
    );
    //move to next middleware
    return next();
  } catch (err) {
    //route to global error handler
    return next({
      log: 'could not get pod Metrics from middleware',
      status: 400,
      message: { err },
    });
  }
};
