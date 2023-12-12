import { NextResponse } from 'next/server';
import { KubePodsStatus } from '@/types/types'

export async function GET(request: Request): Promise<KubePodsStatus> {
  let res = await fetch('http://localhost:8888/metrics/kubePods', {
    cache: 'no-store',
  });
  let data: KubePodsStatus = await res.json();
  // console.log("Raw data: ", data)
  return NextResponse.json(data.statusCount);
}