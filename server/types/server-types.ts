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

export interface PrometheusResponse<T> {
  status: "success" | "error",
  data: T,

  // Only set if status is "error". The data field may still hold
  // additional data.
  errorType: string,
  error: string,

  // Only if there were warnings while executing the request.
  // There will still be data in the data field.
  warnings: string[]
}
