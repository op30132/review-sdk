import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Controls,
  Position,
  useReactFlow,
} from 'reactflow';
import dagre from 'dagre';
import '../../node_modules/reactflow/dist/style.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 200;

function Graph(
  {
    nodes,
    edges,
    isShowCycleEdge = true,
    isSelectable = true,
    isDraggable = true,
    onNodeClick,
    onNodeDragStart,
    onNodeDragStop,
  },
  ref,
) {
  const reactFlowInstance = useReactFlow();
  const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);
  const [layoutedEdges, setLayoutedEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setLayoutedNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setLayoutedEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
    [],
  );

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    let finalEdges = edges;
    dagreGraph.setGraph({
      rankdir: 'LR',
      align: 'UL',
    });
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
    if (!isShowCycleEdge) {
      const cycleList = dagre.graphlib.alg.findCycles(dagreGraph);
      for (let i = 0; i < cycleList.length; i++) {
        const cycle = cycleList[i];
        const begin = cycle[cycle.length - 1];
        for (let j = 0; j < cycle.length - 1; j++) {
          if (dagreGraph.hasEdge(cycle[j], begin)) {
            dagreGraph.removeEdge(cycle[j], begin);
            finalEdges = finalEdges.filter((edge) => {
              return !(edge.source === cycle[j] && edge.target === begin);
            });
          }
        }
      }
    }
    dagre.layout(dagreGraph);
    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = Position.Left;
      node.sourcePosition = Position.Right;
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges: finalEdges };
  };

  useEffect(() => {
    const { nodes: ns, edges: es } = getLayoutedElements(nodes, edges);
    setLayoutedNodes(ns);
    setLayoutedEdges(es);
  }, [nodes, edges]);

  useEffect(() => {
    if (!layoutedEdges.length) return;
  }, [layoutedEdges]);

  const style = { height: 350, width: '100%' };

  return (
    <div style={style}>
      <ReactFlow
        fitView
        ref={ref}
        attributionPosition="top-right"
        nodes={layoutedNodes}
        onNodesChange={onNodesChange}
        edges={layoutedEdges}
        onEdgesChange={onEdgesChange}
        defaultNodes={[]}
        elementsSelectable={isSelectable}
        nodesDraggable={isDraggable}
        onNodeClick={isSelectable ? onNodeClick : undefined}
        onNodeDragStart={isDraggable ? onNodeDragStart : undefined}
        onNodeDragStop={isDraggable ? onNodeDragStop : undefined}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default React.forwardRef(Graph);
