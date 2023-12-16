export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};

export interface PodItem {
  status: string;
  namespace: string;
  name: string;
  creationTimestamp: any;
  dnsPolicy: string;
  containers: number;
  restartPolicy: string;
  hostIP: string;
  podIP: string;
  startTime: any;
}
export interface PodStatusCount {
  [key: string]: number;
}
export interface NodeMemValue {
  'memUsed(kb)': number;
  capacity: number;
  percentage: string;
}
