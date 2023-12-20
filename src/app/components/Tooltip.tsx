import React, { useState } from 'react';
import { V1Pod, V1Node } from '@kubernetes/client-node';

interface TooltipProps {
  children: React.ReactNode | React.ReactNode[];
  data: V1Pod | V1Node;
}

export const Tooltip = (props: TooltipProps) => {
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isShown, setIsShown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoverTimeout(null);
    setIsShown(false);
  };

  const handleMouseEnter = () => {
    console.log(props.data);
    setHoverTimeout(
      setTimeout(() => {
        setIsShown(true);
      }, 300)
    );
  };


    // name,
    // status,
    // podIP,
    // containers,

  let items: Record<string, string> = {};

  if ('containers' in props.data.spec!) {
    const pod = props.data as V1Pod;
    items = {
      Name: pod.metadata!.name!,
      Status: pod.status!.phase!,
      "IP Address": pod.status!.podIP!,
      Containers: pod.spec!.containers!.map(c => c.name).join('\n')
    }
  }
  else {
    const node = props.data as V1Node;
    items = {
        Name: node.metadata!.name!,
        // capacity: node.status!.images!.map(image => image.names![0]).toString(),
        Addresses: node.status!.addresses!.map(addr => addr.address.toString()).join('; '),
    }

    // Add node statuses
    node.status!.conditions!.forEach(cond => items[cond.type]  = cond.status)
  }



  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {props.children}
      {isShown && (
        <div
          className="tooltip"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        >
        {
          Object.entries(items).map(([key, val]) => { return <div>{key + ": " + val}</div>})
        }
        </div>
      )}
    </div>
  );
};

