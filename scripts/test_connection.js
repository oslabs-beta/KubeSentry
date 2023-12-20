// require('dotenv').config();
// import {config} from 'dotenv'

const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const metricsClient = new k8s.Metrics(kc);

async function testk8s() {
  // loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
  // creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
  console.log('k8sApi: ', k8sApi)
  //metrics-server
  console.log('metricsClient: ', metricsClient)
  const nodeMetrics = await metricsClient.getNodeMetrics();
  console.log('nodeMetrics: ', nodeMetrics)
  console.log("topNodes: ", await k8s.topNodes(k8sApi));
  // console.log("nodes: ", (await k8sApi.listNode()).body)
  console.log("nodes: ", (await k8sApi.listPod()).body)
}


/*
console.log("Prometheus Port: ", process.env.PROMETHEUS_PORT)
const promModel = require('../server/Models/prometheusModel')
const PROM_HOST = `http://localhost:${process.env.PROMETHEUS_PORT}/api/v1`;
async function testPrometheus() {
  const promModel = await import('../server/Models/prometheusModel')
  let dateString = promModel.buildDateString()
  console.log('dateString: ', dateString)
  const counter_data = await(promModel.runPromQuery('my_custom_counter{job="protest"}', dateString))
  console.log('counter_data: ', counter_data)
  const dns_data = await promModel.runPromQuery('sum(rate(coredns_dns_requests_total{job=~"kubernetes-service-endpoints"}[5m]))', dateString)
  console.log('dns_data: ', dns_data)
}
*/

// fetch from Prometheus


( async () => {
  await testk8s();
  // await testPrometheus()
  process.exit();
})();