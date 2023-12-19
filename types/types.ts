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

type PromMetricsData = any;
type KubeMetricsstatus = any;
type KubePodsStatus = any;
