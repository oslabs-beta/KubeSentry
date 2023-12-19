"use client";

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import { KubeGraphData } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';
import '../styles/graph.css';

// import cytoscapeCoseBilkent from "cytoscape-cose-bilkent";
// Cytoscape.use(cytoscapeCoseBilkent);

// Styling options
import { layoutOptions, graphCssStyle, graphCytoStyle } from './GraphVisOptions';
Cytoscape.use(require('cytoscape-dom-node'));

// NOTE: Cytoscape bug:
// endBatch() line 12745 needs to add
//       if (!renderer) return this;



type ElementsType = Cytoscape.ElementDefinition[];

export default function GraphVis() {

  let myCyRef = useRef<(cytoscape.Core | null)>(null);
  const [elements, setElements] = useState<ElementsType>([]);
  let didSetData = false;

  const buildGraph = async () => {
    try {
      const response = await fetch('/api/graph', { cache: 'no-store' });
      const data:KubeGraphData = await response.json();
      console.log('Server response: ', data)

      // Build list of graph elements.
      const newElements:ElementsType = []
      const namespaces = new Map<string,number>();
      function getNamespaceId(ns: string) {
        if (!(ns in namespaces)) {
          namespaces.set(ns, namespaces.size);
        }
        return namespaces.get(ns)!;
      }

      function cy_node_def(id: string, label: string, classes: string[]): Cytoscape.ElementDefinition {
        // Add a blank container for React.createPortal to render into
        let node_container = document.createElement("div");
        return {
          'data': { id, label, 'dom': node_container, },
          classes,
          'renderedPosition': { x: 100, y: 100 }
        };
      }



      // Add each node.
      data.nodeList.forEach(node => {
        let nodeName = node.metadata!.name!;
        let namespaceId = getNamespaceId(node.metadata!.namespace!);
        const newNodeDef = cy_node_def(nodeName, nodeName, ['kNode', `namespace${namespaceId}`]);
        newElements.push(newNodeDef);
      })


      data.pods.forEach(pod => {
        const podName = pod.metadata!.name!;
        const containerName = pod.spec!.containers[0].name!;
        const nodeName = pod.spec!.nodeName!;
        let namespaceId = getNamespaceId(pod.metadata!.namespace!);
        const newNodeDef = cy_node_def(podName, containerName, ['pod', `namespace${namespaceId}`]);
        console.log('Adding pod: ', pod);
        newElements.push(newNodeDef);
        newElements.push( { data: { source: nodeName, target: podName, } })
      })



      if (!didSetData) {
        setElements( newElements )
        didSetData = true;
      }
    }
    catch (err) {
      console.log(`Failed to construct graph: ${err}`);
    }
  };

  useEffect( () => { buildGraph() }, [])
  useEffect( () => {
      console.log('Doing layout!')
      const cyGraph = myCyRef!;
      const layout = cyGraph.current!.elements().layout(layoutOptions);
      layout.run();
      console.log('Elements: ', cyGraph.current!.elements())
     }, [elements])




  return (
    <>
    <CytoscapeComponent
      elements={elements}
      style={ graphCssStyle }
      stylesheet={ graphCytoStyle }
      key={uuidv4()}
      layout={ layoutOptions }
      cy={cy => {
        // Grab ref to cytoscape.Core Graph API
        // Install domNode extension
        cy.domNode();
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
          <div className={'cy-node w-fit flex flex-col border hover:border-2 p-0.5 ' + (el.classes! as string[]).join(' ')}>
            <div className="flex flex-row items-center whitespace-nowrap p-0.5">
              <div>{el.data.label}</div>
              <div className='statusDot' />
            </div>
          </div>, el.data.dom);
      })
    }
    </>
  );
}