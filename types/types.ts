import {
  V1ServiceList,
  V1Pod,
  V1DeploymentList,
  V1Node,
} from '@kubernetes/client-node';

export type PieChartData = { [key: string]: number };

export type PrometheusDataItem = [number, string];
export type PromMetricsData = {
  metric: string,
  values: PrometheusDataItem[]
};


export type KubeMetricsstatus = any;
export type KubePodsStatus = any;

export interface PodItem {
  status: string;
  namespace: string;
  name: string;
  creationTimestamp: Date;
  dnsPolicy: string;
  containers: number;
  restartPolicy: string;
  hostIP: string;
  podIP: string;
  startTime: any;
}

export type KubeGraphData = {
  nodeList: V1Node[];
  pods: V1Pod[];
  services: V1ServiceList;
  deployments: V1DeploymentList;
};
