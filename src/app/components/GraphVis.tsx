"use client";

import { useEffect } from 'react';
import Graph from "react-graph-vis";
import { Node, Edge } from "vis";

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";


// Cluster:
const options = {
  // layout: {
  //   hierarchical: false
  // },
  edges: {
    color: "rgb(128,128,128)"
  },
  height: "500px"
};

export default function GraphVis() {


  const buildGraph = async () => {
    try {
      const response = await fetch('/api/graph', { cache: 'no-store' });
      const data = await response.json();
      console.log('Server response: ', data)
    }
    catch (err) {
      console.log(`Failed to construct graph: ${err}`);
    }
  };

  useEffect( () => {
    buildGraph()
  }, [])

  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };


  const events = {
    select: function(event: {nodes: Node[], edges: Edge[]}) {
      let { nodes, edges } = event;
      console.log('nodes: ', nodes)
      console.log('edges: ', edges)
    }
  };

  // TODO: Maintain aspect ratio
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      identifier={'ClusterGraph'}
      getNetwork={network => {
        // If you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}