import React, { useState } from 'react';

interface TooltipProps { children: React.ReactNode[], text: string};

export const Tooltip = (props: TooltipProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {props.children}
      {isHovering && <div className="tooltip">{props.text}</div>}
    </div>
  );
};
