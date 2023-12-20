import {
  NodeStatus,
  PodStatus,
  PodMetricsList,
  NodeMetricsList,
} from '@kubernetes/client-node';
import { PodItem, NodeMemValue, PrometheusDataItem } from './types/server-types';
import { PromMetricsData } from '../types/types';

declare global {
  namespace Express {
    export interface Locals {
      pods: {
        pods: PodItem[];
        nameSpace: string[];
        statusCount: PodStatusCount;
      };
      topPods: PodStatus[];
      topNodes: NodeStatus[];
      podMetrics: PodMetricsList;
      nodeMetrics: NodeMetricsList;
      prometheusData: PrometheusBackendResponse,
      counterData: PromMetricsData;
      nodeMem: { [key: string]: NodeMemValue };
    }
  }
}
