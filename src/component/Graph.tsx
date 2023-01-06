import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Controls,
  Background,
  Position,
} from 'reactflow';
import dagre from 'dagre';
import '../../node_modules/reactflow/dist/style.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 150;
const nodeHeight = 200;

function Graph({ nodes, edges }) {
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
    dagreGraph.setGraph({ rankdir: 'LR' });
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

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

    return { nodes, edges };
  };

  useEffect(() => {
    const { nodes: ns, edges: es } = getLayoutedElements(nodes, edges);
    setLayoutedNodes(ns);
    setLayoutedEdges(es);
  }, [nodes, edges]);

  useEffect(() => {
    if (!layoutedEdges.length) return;
  }, [layoutedEdges]);

  const style = { height: '350px', width: '100%' };

  return (
    <div style={style}>
      <ReactFlow
        fitView
        nodes={layoutedNodes}
        onNodesChange={onNodesChange}
        edges={layoutedEdges}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Graph;
