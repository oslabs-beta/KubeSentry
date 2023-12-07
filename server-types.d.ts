import { NodeStatus } from '@kubernetes/client-node';

declare global {
  namespace Express {
    interface Locals {
      pods: any,
      topPods: any,
      topNodes: NodeStatus[],
      nodeMetrics: any,
      data: any,
      result: any
    }
  }
}
