//creates a Kubernetes cluster object
import { KubeConfig, CoreV1Api, Metrics, topNodes, topPods, NodeMetric, V1Pod, NodeStatus, V1PodStatus } from '@kubernetes/client-node';
const kc = new KubeConfig();
//loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
kc.loadFromDefault();
//creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
export const k8sApi = kc.makeApiClient(CoreV1Api);
//mertics-server
export const metricsClient = new Metrics(kc);


export async function k8top() {
 return await topNodes(k8sApi);
}