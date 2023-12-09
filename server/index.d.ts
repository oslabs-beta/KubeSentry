import { NodeStatus, PodStatus, PodMetricsList, NodeMetricsList } from '@kubernetes/client-node';
import { PodItem, NodeMemValue } from './types/server-types'

declare global {
  namespace Express {
    export interface Locals {
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


declare module s {
  type SecretServerType = {length: number};
}

export = s;