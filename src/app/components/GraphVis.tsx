"use client";

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
// import cytoscapeCoseBilkent from "cytoscape-cose-bilkent";
import { KubeGraphData } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';
import '../styles/graph.css';

// Cytoscape bug:
// endBatch() line 12745 needs to add
//       if (!renderer) return this;

// Cytoscape.use(cytoscapeCoseBilkent);
Cytoscape.use(require('cytoscape-dom-node'));

// Cluster:
const style: Cytoscape.Stylesheet[] = [
    {
      selector: 'node',
      style: {
        color: '#ddd',
        shape: 'round-rectangle',
        width: 10,
        height: 10,
        opacity: 0,
        'background-color': '#444',
        'border-width': 2,
        'overlay-padding': 5
      }
    },
    {
      selector: '.kNode',
      style: {
        width: 10,
        height: 10,
        'background-color': '#66d',
        label: undefined,
        'content': 'data(label)',
        'text-valign': 'center'
      }
    },
    {
      selector: '.pod',
      style: {
        label: 'data(label)'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#555',
        'target-arrow-color': '#555',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
]

const graphStyle =  {
  width: '100%',
  height: '100%',
  'color': 'white',
  'backgroundColor': '#222222',
  'borderRadius': '10px'
}

const palette = ["#22577a","#38a3a5","#c8b8db","#d1efb5","#bf4e30"];

palette.forEach((color, i) => {
  style.push({
    selector: `.namespace${i}`,
    style: {
      'background-color': color
    }
  })

})

const layoutStyle =  {
  name: 'cose',
  idealEdgeLength: 250,
  nodeOverlap: 20,
  refresh: 20,
  fit: false,
  padding: 30,
  randomize: false,
  componentSpacing: 100,
  nodeRepulsion: 400000,
  edgeElasticity: 100,
  nestingFactor: 5,
  gravity: 80,
  numIter: 1000,
  initialTemp: 200,
  coolingFactor: 0.95,
  minTemp: 1.0
}


// the default values of each option are outlined below:
let defaults = {
  menuRadius: function(ele: any){ return 100; }, // the outer radius (node center to the end of the menu) in pixels. It is added to the rendered size of the node. Can either be a number or function as in the example.
  selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: [ // an array of commands to list in the menu or a function that returns the array
    { // example command
      fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
      content: 'a command name', // html/text content to be displayed in the menu
      contentStyle: {}, // css key:value pairs to set the command's css in js if you want
      select: function(ele: any){ // a function to execute when the command is selected
        console.log( ele.id() ) // `ele` holds the reference to the active element
      },
      hover: function(ele: any){ // a function to execute when the command is hovered
        console.log( ele.id() ) // `ele` holds the reference to the active element
      },
      enabled: true // whether the command is selectable
    }
  ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
  fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
  activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size,
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  adaptativeNodeSpotlightRadius: false, // specify whether the spotlight radius should adapt to the node size
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
  openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: 'white', // the colour of text in the command's content
  itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false, // draw menu at mouse position
  outsideMenuCancel: false as const // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given
};

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
        let node_container = document.createElement("div");
        // let container = document.createElement("div");
        // node_container.appendChild(container)
        // container.className = 'cy-node w-fit flex flex-col border hover:border-2 p-0.5';
        // // container.innerHTML = `<div class="flex flex-row whitespace-nowrap">${label}</div> <span class="whitespace-nowrap">${HTML_Label || id}</span>`;
        // container.innerHTML = `<div class="flex flex-row items-center whitespace-nowrap p-0.5"><div>${label}</div><div class='statusDot'></div></div>`;


        return {
          'data': {
            id,
            label,
            'dom': node_container,
          },
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
      const layout = cyGraph.current!.elements().layout(layoutStyle);
      layout.run();
      console.log('Elements: ', cyGraph.current!.elements())
     }, [elements])




  return (
    <>
    <CytoscapeComponent
      elements={elements}
      style={graphStyle}
      stylesheet={ style }
      key={uuidv4()}
      layout={layoutStyle}
      cy={cy => {
        // Add domNode drawing
        cy.domNode();
        myCyRef.current = cy
        // Add context menu
        // let menu = cyGraph.cxtmenu( defaults );
      }} // Grab ref to cytoscape.Core
    />
    {
    elements
      .filter(el => el.data.dom)
      .map(el => {
        console.log('el element: ', el);
        return createPortal(
          <div className='cy-node w-fit flex flex-col border hover:border-2 p-0.5'>
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