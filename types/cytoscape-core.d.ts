// declare module 'cytoscape-cose-bilkent';

// cytoscape.d.ts
import cytoscape, { Core } from 'cytoscape';

declare module 'cytoscape' {
  interface Core {
    domNode: () => HTMLElement; // adjust the return type if needed
  }
}