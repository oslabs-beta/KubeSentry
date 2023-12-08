import { NodeStatus, PodStatus, PodMetricsList, NodeMetricsList } from '@kubernetes/client-node';
import { PodItem, NodeMemValue } from './server-types'

declare global {
  namespace Express {
    interface Locals {
      pods: {pods: PodItem[], nameSpace: string[]},
      topPods: PodStatus[],
      topNodes: NodeStatus[],
      podMetrics: PodMetricsList,
      nodeMetrics: NodeMetricsList,
      counterData: {metrics: any, value: any},
      nodeMem: {[key: string] : NodeMemValue}
    }
  }
}
