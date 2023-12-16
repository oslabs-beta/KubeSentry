import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    let response = await fetch('http://localhost:8888/metrics/kubepods', {
      cache: 'no-store',
    });
    let data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    //return error message back to NEXT.JS endpoint
    return NextResponse.json({
      log: `could not get pods in next: ${err}`,
      status: 500,
      message: { err: err },
    });
  }
}

//delete a pod
export async function DELETE(request: Request) {
  try {
    //extract name, namespace from request coming in as an object
    const { name, namespace } = await request.json();
    //fetch to the express server endpoint
    await fetch(`http://localhost:8888/metrics/delete/${namespace}/${name}`, {
      cache: 'no-store',
    });
    //return response back to the NEXT.JS endpoint
    return NextResponse.json(`pod ${name} in ${namespace} was deleted`);
  } catch (err) {
    //return error message back to NEXT.JS endpoint
    return NextResponse.json({
      log: 'could not delete pod in next',
      status: 500,
      message: { err: err },
    });
  }
}
