import Graph from "react-graph-vis";
import { Node, Edge } from "vis";

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";


// Cluster:

export default function GraphVis() {
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

  const options = {
    layout: {
      hierarchical: true
    },
    edges: {
      color: "rgb(128,128,128)"
    },
    height: "500px"
  };

  const events = {
    select: function(event: {nodes: Node[], edges: Edge[]}) {
      let { nodes, edges } = event;
      console.log('nodes: ', nodes)
      console.log('edges: ', edges)
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}