import { NextResponse } from 'next/server';
import { KubeGraphData } from '@/types/types'

export async function GET() {
  console.log('Fetching /api/graph/')
  let res = await fetch('http://localhost:8888/metrics/kubeGraph', {
    next: { revalidate: 30 }
  });
  let data: KubeGraphData = await res.json();
  console.log("Raw data: ", data)
  return NextResponse.json(data);
}