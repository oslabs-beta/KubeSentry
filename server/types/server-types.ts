export type ServerError = {
  log: string;
  status: number;
  message: { err: string };
};


export interface PodStatusCount {
  [key: string]: number;
}
export interface NodeMemValue {
  'memUsed(kb)': number;
  capacity: number;
  percentage: string;
}
