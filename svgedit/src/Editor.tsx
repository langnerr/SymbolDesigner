import React, { useRef, useEffect } from "react";
import { useEditorStore } from "./store";
import { initNodes } from "./storeUtility";
import { LineNode, RectangleNode } from "./nodes";

const Editor: React.FC = () => {
  const store = useEditorStore();
  const svgRef = useRef<SVGSVGElement>(null);

  const getSvgPoint = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svg = svgRef.current;
    if (!svg) {
      return { x: 0, y: 0 };
    }

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const ctm = svg.getScreenCTM();
    if (ctm) {
      return point.matrixTransform(ctm.inverse());
    } else {
      return { x: 0, y: 0 };
    }
  };

  const onMouseDown = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const pt = getSvgPoint(event);
    // console.log("onMouseDown", pt);
    store.mouseDown({
      x: pt.x,
      y: pt.y,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const onMouseUp = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const pt = getSvgPoint(event);

    store.mouseUp({
      x: pt.x,
      y: pt.y,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const onMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const pt = getSvgPoint(event);
    store.mouseMove({
      x: pt.x,
      y: pt.y,
      clientX: event.clientX,
      clientY: event.clientY,
    });
  };

  const onWheel = (event: WheelEvent) => {
    event.preventDefault();

    if (event.metaKey || event.ctrlKey) {
      store.zoomViewport({
        deltaY: event.deltaY,
        clientX: event.clientX,
        clientY: event.clientY,
      });
    } else {
      store.panningViewport({ deltaX: event.deltaX, deltaY: event.deltaY });
    }
    // setTranslate((prevTranslate) => {
    //   return {
    //     x: prevTranslate.x - event.deltaX,
    //     y: prevTranslate.y - event.deltaY,
    //   };
    // });
  };

  const onResize = () => {
    const svgRoot = svgRef.current;
    if (svgRoot) {
      const width = Math.floor(window.innerWidth) - 2;
      const height = Math.floor(window.innerHeight) - 4;

      svgRoot.setAttribute("width", `${width}`);
      svgRoot.setAttribute("height", `${height}`);

      store.setCanvasSize(width, height);
    }
  };

  useEffect(() => {
    onResize();
    initNodes();

    const svgRoot = svgRef.current;
    if (svgRoot) {
      svgRoot.addEventListener("wheel", onWheel, { passive: false });
    }
    window.addEventListener("resize", onResize);

    return () => {
      if (svgRoot) {
        svgRoot.removeEventListener("wheel", onWheel);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // viewBox={`${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`}

  return (
    <svg
      ref={svgRef}
      width="400"
      height="400"
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      viewBox={`${store.viewport.x} ${store.viewport.y} ${store.viewport.width} ${store.viewport.height}`}
    >
      <g>
        <line key="xyz" x1="0" y1="0" x2="100" y2="100" stroke="black" />

        {store.nodes.map((node) => {
          switch (node.type) {
            case "LINE":
              const line = node as LineNode;
              return (
                <line
                  key={node.id}
                  id={node.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={line.color}
                />
              );
            case "RECT":
              const rect = node as RectangleNode;
              return (
                <rect
                  key={node.id}
                  id={node.id}
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  stroke={rect.color}
                  fill={rect.fillColor}
                />
              );
            default:
              return null;
          }
        })}

        {store.handleNodes.map((node) => {
          return (
            <rect
              key={node.id}
              id={node.id}
              x={node.x - node.size / store.viewport.zoom}
              y={node.y - node.size / store.viewport.zoom}
              width={(node.size * 2) / store.viewport.zoom}
              height={(node.size * 2) / store.viewport.zoom}
              strokeWidth={1 / store.viewport.zoom}
              stroke="black"
              fill={node.color}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Editor;
