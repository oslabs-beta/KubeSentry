import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      yt: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}