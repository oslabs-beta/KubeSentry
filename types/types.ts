export type PieChartData = { [key: string]: number };

export type PrometheusDataItem = [number, string];
export type PromMetricsData = {metric: string, values: PrometheusDataItem[]};

export type KubeMetricsstatus = any;
export type KubePodsStatus = any;