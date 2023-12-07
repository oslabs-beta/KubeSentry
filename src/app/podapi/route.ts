import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  let response = await fetch('http://localhost:8888/metrics/kubepods', {
    cache: 'no-store',
  });
  let data = await response.json();
  return NextResponse.json(data);
}
