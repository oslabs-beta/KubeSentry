import React, { useState } from 'react';

interface TooltipProps { children: React.ReactNode[], text: string};

export const Tooltip = (props: TooltipProps) => {
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout>|null>(null);
  const [isShown, setIsShown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    });
  };

  return (
    <div
      onMouseEnter={() => {
        console.log(props.text);
        setHoverTimeout(setTimeout( () => { setIsShown(true) }, 300));
      }}
      onMouseLeave={() => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setHoverTimeout(null);
        setIsShown(false)
    }}
      onMouseMove={handleMouseMove}
    >
      {props.children}
      {isShown && (
        <div
          className="tooltip"
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
        >
          {props.text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;