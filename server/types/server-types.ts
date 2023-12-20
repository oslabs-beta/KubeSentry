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

// https://prometheus.io/docs/prometheus/latest/querying/api/
import { PrometheusDataItem } from "../../types/types";

type PrometheusRangeVector = {
  metric: Record<string, string>,
  values: PrometheusDataItem[],
}

interface PrometheusData {
  resultType: ("matrix" | "vector" | "scalar" | "string"),
  result: PrometheusRangeVector[];
}

export interface PrometheusResponse {
  status: "success" | "error",
  data: PrometheusData,

  // Only set if status is "error". The data field may still hold
  // additional data.
  errorType: string,
  error: string,

  // Only if there were warnings while executing the request.
  // There will still be data in the data field.
  warnings: string[]
}
