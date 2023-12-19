"use client";

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import cytoscapeCoseBilkent from "cytoscape-cose-bilkent";
import { KubeGraphData } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';
import '../styles/graph.css';

// import cytoscapeCoseBilkent from "cytoscape-cose-bilkent";
// Cytoscape.use(cytoscapeCoseBilkent);

// Styling options
import { layoutOptions, graphCssStyle, graphCytoStyle } from './GraphVisOptions';
import { on } from 'events';
Cytoscape.use(cytoscapeCoseBilkent);
Cytoscape.use(require('cytoscape-dom-node'));

// NOTE: Cytoscape bug:
// endBatch() line 12745 needs to add
//       if (!renderer) return this;



type ElementsType = Cytoscape.ElementDefinition[];

export default function GraphVis() {

  // Store a ref to the Cytoscape graph
  let myCyRef = useRef<(cytoscape.Core | null)>(null);

  // Store Cytoscape elements
  const [elements, setElements] = useState<ElementsType>([]);

  const [storeInterval, setStoreInterval] = useState<ReturnType<typeof setInterval>>();


  // Function fetch data from backend and build graph.
  // Called in useEffect().
  const buildGraph = async () => {
    try {

      /* Fetch data from remote */
      const response = await fetch('/api/graph', { cache: 'no-store' });
      const data:KubeGraphData = await response.json();

      /* Load stored data */
      let storedElementString = window.localStorage.getItem("CytoGraphElements");
      let storedElements: any = storedElementString ? JSON.parse( storedElementString ) : {};
      const storedNodes: Cytoscape.NodeDataDefinition[] = storedElements?.elements?.nodes || [];
      const id_to_pos: Record<string, Cytoscape.Position> = {};
      storedNodes.forEach(node => id_to_pos[node.data.id] = node.position!);
      console.log(id_to_pos);

      // Build list of namespaces.
      const newElements:ElementsType = []
      const namespaces = new Map<string,number>();
      function getNamespaceId(ns: string) {
        if (!(namespaces.has(ns))) {
          namespaces.set(ns, namespaces.size);
        }
        return namespaces.get(ns);
      }

      // Build list of namespaces. Assume there's at least one pod in each NS.
      data.pods.forEach(pod => getNamespaceId(pod.metadata!.namespace!));


      // Helper function used to build graph nodes.
      function cy_node_def(id: string, label: string, classes: string[]): Cytoscape.ElementDefinition {
        // Create a div for each element using cytoscape-dom-node.
        // createPortal() will render the contents of these nodes.
        if (!id) {
          console.trace(`Unknown ID: ${id} ${label} ${classes}`)
        }
        let node_container = document.createElement("div");
        const position = (id in id_to_pos) ? id_to_pos[id] : { x: 100, y: 100 };
        return {
          'data': { id, label, 'dom': node_container, },
          classes,
          position
        };
      }



      // Add each Kubernetes node as a Cytoscape graph node.
      data.nodeList.forEach(node => {
        let nodeName = node.metadata!.name!;
        let namespaceId = getNamespaceId(node.metadata!.namespace!);
        const newNodeDef = cy_node_def(nodeName, nodeName, ['node', `namespace${namespaceId}`]);
        newElements.push(newNodeDef);
      })


      // Add each Kubernetes namespace as a Cytoscape graph node.
      // Assume only one node for now, one node per namespace
      const clusterNodeId = newElements[0].data.id;

      // Namespace parent item
      for (const [namespace, id] of namespaces.entries()) {
        // Why do we get an undefined one?
        if (!namespace) continue;

        newElements.push( {
          'data': { id: namespace + "_parent", label: namespace },
          classes: ['namespace_parent', `namespace${id}`],
        })

        // Namespace center item
        const newNodeDef = cy_node_def(namespace, namespace, ['namespace', `namespace${id}`]);
        newNodeDef.data.parent = namespace + "_parent";
        newElements.push( newNodeDef)

        // Edge from node to namespace center item
        newElements.push( { data: { source: clusterNodeId, target: namespace }, classes:'node_to_ns' })
      }



      // Add each Kubernetes pod.
      data.pods.forEach(pod => {
        const podName = pod.metadata!.name!;
        const containerName = pod.spec!.containers[0].name!;
        const nodeName = pod.spec!.nodeName!;
        const namespace = pod.metadata!.namespace!;
        let namespaceId = getNamespaceId(namespace);
        const newNodeDef = cy_node_def(podName, containerName, ['pod', `namespace${namespaceId}`]);
        newNodeDef.data.parent = namespace + "_parent";
        newElements.push(newNodeDef);
        // Attach an edge from each pod to the node it's running on.
        // const e: Cytoscape.ElementDefinition;
        newElements.push( { data: { source: namespace, target: podName } , classes: 'ns_to_pod'})
      })

      setElements(newElements);
      setStoreInterval(interval => {
        if (interval) {
          clearInterval(interval);
        }
        return setInterval(() => {
        console.log('Storing elements')
        window.localStorage.setItem("CytoGraphElements", JSON.stringify( myCyRef.current!.json() ));
        }, 5000)
      });

    }
    catch (err) {
      console.log(`Failed to construct graph: ${err}`);
    }
  };

  // Fetch initial data on load.
  useEffect( () => {
    if (elements.length === 0) {
      buildGraph();
    };
  }, [])

  // Run layout algorithm after graph is populated.
  useEffect( () => {
      const cyGraph = myCyRef!;
      const layout = cyGraph.current!.elements().layout(layoutOptions);
      // layout.run();
      console.log('Elements: ', cyGraph.current!.elements())
    }, [elements])




  return (
    <>
    <CytoscapeComponent
      elements={elements}
      style={ graphCssStyle }
      stylesheet={ graphCytoStyle }
      key={uuidv4()}
      // layout={ layoutOptions }
      cy={cy => {
        // Install domNode extension
        cy.domNode();
        // Grab ref to cytoscape.Core Graph API
        myCyRef.current = cy
        // Add context menu
        // let menu = cyGraph.cxtmenu( defaults );
      }}
    />
    {
    elements
      .filter(el => el.data.dom)
      .map(el => {
        return createPortal(
          <div className={'cy-node w-fit flex flex-col border hover:border-2' + ` ${el.data.id} ` + (el.classes! as string[]).join(' ')}>
            <div className="flex flex-row items-center whitespace-nowrap p-0.5">
              <div>{el.data.label}</div>
              <div className='statusDot' />
            </div>
            <div className='lowerBorder'>
              <div>{el.classes![0]}</div>
            </div>
          </div>, el.data.dom);
      })
    }
    </>
  );
}