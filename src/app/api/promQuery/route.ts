import { NextRequest, NextResponse } from 'next/server';
import { PromMetricsData } from '../../../../types/types'

export async function GET(request: NextRequest) {
  let res = await fetch(`http://localhost:8888/metrics/prom?query=${request.nextUrl.searchParams.get("query")}`, {
    cache: 'no-store',
  });
  let data: PromMetricsData = await res.json();
  return NextResponse.json(data);
}
