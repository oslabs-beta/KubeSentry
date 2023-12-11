//creates a Kubernetes cluster object
import {
  KubeConfig,
  CoreV1Api,
  Metrics,
  AppsV1Api
} from '@kubernetes/client-node';

const kc = new KubeConfig();
//loads the authentication data to our kubernetes object of our current cluster so it can talk to kube-apiserver
kc.loadFromDefault();
//creates a kubernetes api client with our auth data. : This is what is doing the talking to the Kube-Apiserer.
export const k8sApi = kc.makeApiClient(CoreV1Api);
// For
export const k8sAppsApi = kc.makeApiClient(AppsV1Api)
//mertics-server
export const metricsClient = new Metrics(kc);