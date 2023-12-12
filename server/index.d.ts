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
      nodeMem: Record<string, NodeMemValue>,
      prometheusData: PrometheusBackendResponse;
      counterData: { metrics: any; value: any };
      services: V1ServiceList,
      deployments: V1DeplymentList
    }
  }
}