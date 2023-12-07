import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  let response = await fetch('http://localhost:8888/metrics/kubepods', {
    cache: 'no-store',
  });
  let data = await response.json();
  return NextResponse.json(data);
}

//delete a pod
export async function DELETE(request: Request) {
  const { name, namespace } = await request.json();
  console.log('in next server', name, namespace);
  let response = await fetch(
    `http://localhost:8888/metrics/delete/${namespace}/${name}`,
    {
      cache: 'no-store',
    }
  );
  let data = await response.json();
  return NextResponse.json(`pod ${name} iin ${namespace} was deleted`);
}
