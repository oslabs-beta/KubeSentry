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

export type PrometheusDataItem = [number, string];
export type PromMetricsData = {metric: string, values: PrometheusDataItem[]};

export type KubeMetricsstatus = any;
export type KubePodsStatus = any;