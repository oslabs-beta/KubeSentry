export type PieChartData = { [key: string]: number };

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

export type PromMetricsData = any;
export type KubeMetricsstatus = any;
export type KubePodsStatus = any;