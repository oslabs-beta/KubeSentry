import {
  NodeStatus,
  PodStatus,
  PodMetricsList,
  NodeMetricsList,
} from '@kubernetes/client-node';
import {
  PodItem,
  NodeMemValue,
  PrometheusDataItem,
} from './types/server-types';
import { PromMetricsData } from '../types/types';

declare global {
  namespace Express {
    export interface Locals {
      pods: {
        pods: PodItem[];
        nameSpace: string[];
        statusCount: PodStatusCount;
      };
      rawPods: V1Pod[],
      topPods: PodStatus[];
      topNodes: NodeStatus[];
      podMetrics: PodMetricsList;
      nodeMetrics: NodeMetricsList;
      nodeMem: Record<string, NodeMemValue>,
      prometheusData: PrometheusBackendResponse;
      counterData: PromMetricsData;
      services: V1ServiceList,
      deployments: V1DeplymentList
    }
  }
}