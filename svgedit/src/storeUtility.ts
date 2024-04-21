import { BaseNode, HandleNode, LineNode, RectangleNode } from "./nodes";
import { editorStore } from "./store";

export function initNodes() {
  const X_SIZE = 600;
  const Y_SIZE = 400;

  for (let i = 0; i < 10; i++) {
    const node = editorStore
      .getState()
      .createLine(
        Math.floor(Math.random() * X_SIZE),
        Math.floor(Math.random() * Y_SIZE),
        Math.floor(Math.random() * X_SIZE),
        Math.floor(Math.random() * Y_SIZE)
      );
  }
  for (let i = 0; i < 10; i++) {
    const node = editorStore
      .getState()
      .createRectangle(
        Math.floor(Math.random() * X_SIZE),
        Math.floor(Math.random() * Y_SIZE),
        Math.floor((Math.random() * X_SIZE) / 4),
        Math.floor((Math.random() * Y_SIZE) / 4)
      );
  }
}

export function getHandleNodes(node: BaseNode) {
  const handleNodes: HandleNode[] = [];
  switch (node.type) {
    case "LINE":
      const line = node as LineNode;
      handleNodes.push(new HandleNode(1, line.x1, line.y1));
      handleNodes.push(new HandleNode(2, line.x2, line.y2));
      break;
    case "RECT":
      const rectangle = node as RectangleNode;
      handleNodes.push(new HandleNode(1, rectangle.x, rectangle.y));
      handleNodes.push(
        new HandleNode(2, rectangle.x + rectangle.width, rectangle.y)
      );
      handleNodes.push(
        new HandleNode(
          3,
          rectangle.x + rectangle.width,
          rectangle.y + rectangle.height
        )
      );
      handleNodes.push(
        new HandleNode(4, rectangle.x, rectangle.y + rectangle.height)
      );
      break;
  }
  return handleNodes;
}

export function round(x: number) {
  const fac = 10e4;
  return Math.round(x * fac) / fac;
}
