// require('dotenv').config();
// import {config} from 'dotenv'

//creates a Kubernetes cluster object
// import { KubeConfig, CoreV1Api, Metrics, topNodes, topPods, NodeMetric, V1Pod, NodeStatus, V1PodStatus } from '@kubernetes/client-node';
// { KubeConfig, CoreV1Api, Metrics, topNodes, topPods, NodeMetric, V1Pod, NodeStatus, V1PodStatus } = require('@kubernetes/client-node')
// const k8s = require('@kubernetes/client-node');

// const promModel = require('../server/Models/prometheusModel')
// import { buildDateString, runPromQuery } from '../server/Models/prometheusModel';


/*
async function testk8s() {
  const kc = new k8s.KubeConfig();
  //loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
  kc.loadFromDefault();
  //creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  console.log('k8sApi: ', k8sApi)
  //metrics-server
  const metricsClient = new k8s.Metrics(kc);
  console.log('metricsClient: ', metricsClient)
  const nodeMetrics = await metricsClient.getNodeMetrics();
  console.log('nodeMetrics: ', nodeMetrics)
  const topNodeOut = await k8s.topNodes(k8sApi);
  console.log("topNodeOut: ", topNodeOut);
}
*/




console.log("Prometheus Port: ", process.env.PROMETHEUS_PORT)
const PROM_HOST = `http://localhost:${process.env.PROMETHEUS_PORT}/api/v1`;

// fetch from Prometheus


( async () => {
  // await testk8s();
  const promModel = await import('../server/Models/prometheusModel')
  let dateString = promModel.buildDateString()
  console.log('dateString: ', dateString)
  const counter_data = await(promModel.runPromQuery('my_custom_counter{job="protest"}', dateString))
  console.log('counter_data: ', counter_data)
  const dns_data = await promModel.runPromQuery('sum(rate(coredns_dns_requests_total{job=~"kubernetes-service-endpoints"}[5m]))', dateString)
  console.log('dns_data: ', dns_data)
  process.exit();
})();
