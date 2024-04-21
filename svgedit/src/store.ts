//

import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { getHandleNodes, round } from "./storeUtility";
import { Vector } from "./Vector";
import {
  BaseNode,
  HandleNode,
  LineNode,
  NodeType,
  RectangleNode,
} from "./nodes";

type ToolType = "SELECT" | "CREATE_LINE" | "CREATE_RECT";
type StateType = "SELECT" | "WANT_DRAG_NODE" | "DRAG_NODE" | "WANT_DRAG_HANDLE";

interface ECMouseEvent {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

type EditorState = {
  currentTool: ToolType;
  nodes: BaseNode[];
  selectedNode: BaseNode | undefined;
  handleNodes: HandleNode[];

  currentState: StateType;
  dragStart: { x: number; y: number; clientX: number; clientY: number };
  dragStartPosition: Vector;

  canvas: {
    width: number;
    height: number;
  };
  viewport: {
    x: number;
    y: number;
    width: number;
    height: number;
    zoom: number;
  };

  setCanvasSize(width: number, height: number): void;
  zoomViewport: (arg: {
    deltaY: number;
    clientX: number;
    clientY: number;
  }) => void;
  setTool: (tool: ToolType) => void;

  mouseDown: (event: ECMouseEvent) => void;
  mouseMove: (event: ECMouseEvent) => void;
  mouseUp: (event: ECMouseEvent) => void;

  clearNodes: () => void;
  createLine(x1: number, y1: number, x2: number, y2: number): LineNode;
  createRectangle(
    x: number,
    y: number,
    width: number,
    height: number
  ): RectangleNode;
  createNode: (type: NodeType) => BaseNode;

  pickId: (position: { x: number; y: number }) => string | undefined;
};

// export const useEditorStore = create<EditorState>((set) => ({
const editorStore = createStore<EditorState>((set) => ({
  currentState: "SELECT",
  currentTool: "SELECT",
  nodes: [],
  selectedNode: undefined,
  handleNodes: [],
  dragStart: { x: 0, y: 0, clientX: 0, clientY: 0 },
  dragStartPosition: new Vector(0, 0),

  canvas: { width: 800, height: 600 },
  viewport: { x: 0, y: 0, width: 800, height: 600, zoom: 1 },

  setCanvasSize: (width, height) => {
    set((state) => {
      return {
        canvas: {
          width: round(width),
          height: round(height),
          viewport: {
            ...state.viewport,
            width: round(width / state.viewport.zoom),
            height: round(height) / state.viewport.zoom,
          },
        },
      };
    });
  },
  zoomViewport: ({ deltaY, clientX, clientY }) => {
    set((state) => {
      const x = state.viewport.x + clientX / state.viewport.zoom;
      const y = state.viewport.y + clientY / state.viewport.zoom;

      const MAX_DELTA = 10;
      let delta = Math.min(Math.abs(deltaY), MAX_DELTA);
      const sign = -Math.sign(deltaY);
      delta = delta * sign;

      const oldZoom = state.viewport.zoom;
      const newZoom = oldZoom * (1 + delta / 100);

      const newX = x - (oldZoom / newZoom) * (x - state.viewport.x);
      const newY = y - (oldZoom / newZoom) * (y - state.viewport.y);
      return {
        viewport: {
          x: round(newX),
          y: round(newY),
          zoom: round(newZoom),
          width: round(state.canvas.width / newZoom),
          height: round(state.canvas.height / newZoom),
        },
      };
    });
  },

  setTool(tool) {
    set({ currentTool: tool });
  },

  mouseDown: (event: ECMouseEvent) => {
    set((state) => {
      switch (state.currentState) {
        case "SELECT":
          {
            const id = state.pickId({ x: event.clientX, y: event.clientY });
            if (id) {
              const node = state.nodes.find((n) => n.id === id);
              if (node) {
                const startPos = node
                  .getPosition()
                  .subtract(new Vector(event.x, event.y));
                const handleNodes = getHandleNodes(node);
                return {
                  currentState: "WANT_DRAG_NODE",
                  dragStart: { ...event },
                  dragStartPosition: startPos,
                  selectedNode: node,
                  handleNodes: handleNodes,
                };
              } else {
                const handle = state.handleNodes.find((n) => n.id === id);
                if (handle) {
                  return {
                    currentState: "WANT_DRAG_HANDLE",
                    dragStart: { ...event },
                  };
                }
              }
            } else {
              return { handleNodes: [], selectedNode: undefined };
            }
          }
          break;
      }
      return {};
    });
  },

  mouseUp: (event: ECMouseEvent) => {
    set((state) => {
      switch (state.currentState) {
        case "WANT_DRAG_NODE":
          return { currentState: "SELECT" };
        case "WANT_DRAG_HANDLE":
          return { currentState: "SELECT" };

        case "DRAG_NODE":
          if (state.selectedNode) {
            const handleNodes = getHandleNodes(state.selectedNode);
            return {
              currentState: "SELECT",
              handleNodes: handleNodes,
            };
          }
      }
      return {};
    });
  },

  mouseMove: (event: ECMouseEvent) => {
    set((state) => {
      switch (state.currentState) {
        case "WANT_DRAG_NODE":
          {
            // start only if the mouse has moved more than 5 pixels
            const dx = event.clientX - state.dragStart.clientX;
            const dy = event.clientY - state.dragStart.clientY;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
              return {
                currentState: "DRAG_NODE",
                handleNodes: [],
              };
            }
          }
          break;
        case "DRAG_NODE": {
          const newPos = state.dragStartPosition.add(
            new Vector(event.x, event.y)
          );
          const newNodes = state.nodes.map((node) => {
            if (node.id === state.selectedNode?.id) {
              node.setPosition(newPos);
            }
            return node;
          });
          return {
            nodes: newNodes,
          };
        }
      }
      return {};
    });
  },

  clearNodes: () => set({ nodes: [] }),

  createLine: (x1: number, y1: number, x2: number, y2: number) => {
    const line = new LineNode();
    line.x1 = x1;
    line.y1 = y1;
    line.x2 = x2;
    line.y2 = y2;
    set((state) => ({ nodes: [...state.nodes, line] }));
    return line;
  },

  createRectangle: (x: number, y: number, width: number, height: number) => {
    const rect = new RectangleNode();
    rect.x = x;
    rect.y = y;
    rect.width = width;
    rect.height = height;
    set((state) => ({ nodes: [...state.nodes, rect] }));
    return rect;
  },

  createNode(type) {
    let node: BaseNode;
    switch (type) {
      case "LINE":
        node = new LineNode();
        break;
      case "RECT":
        node = new RectangleNode();
        break;
      default:
        throw new Error(`Invalid node type: ${type}`);
    }
    set((state) => ({ nodes: [...state.nodes, node] }));
    return node;
  },

  pickId({ x, y }) {
    const clickedElement = document.elementFromPoint(x, y);
    if (clickedElement) {
      const id = clickedElement.attributes.getNamedItem("id")?.value;
      return id;
    }
    return undefined;
  },
}));

editorStore.subscribe((state) => {
  console.log(">> changes: ", state);
});

const useEditorStore = () => useStore(editorStore);

export { editorStore, useEditorStore };
