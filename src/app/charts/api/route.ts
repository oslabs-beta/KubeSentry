import { NextRequest, NextResponse } from 'next/server';
import { PromMetricsData } from '../../../../types/types';

export async function GET(request: NextRequest) {
  let res = await fetch(`http://localhost:8888/metrics/prom?query=${request.nextUrl.searchParams.get("query")}`, {
    cache: 'no-store',
  });
  let data: PromMetricsData = await res.json();
  return NextResponse.json(data);
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
