'use client';
import GraphVis from '@/src/app/components/GraphVis';
import React from 'react';
import { useState, useEffect } from 'react';

export default function Page() {


  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <GraphVis/>
    </div>
  );
}
