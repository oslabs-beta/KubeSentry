import { NodeStatus, PodStatus, PodMetricsList, NodeMetricsList } from '@kubernetes/client-node';
import { PodItem, NodeMemValue, PrometheusDataItem } from './types/server-types'

declare global {
  namespace Express {
    export interface Locals {
      pods: {pods: PodItem[], nameSpace: string[], statusCount: PodStatusCount};
      topPods: PodStatus[],
      topNodes: NodeStatus[],
      podMetrics: PodMetricsList,
      nodeMetrics: NodeMetricsList,
      prometheusData: PrometheusBackendResponse,
      nodeMem: Record<string, NodeMemValue>,
    }
  }
}
