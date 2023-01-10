import { refineFlow } from '@src/utils/refineflow';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import Graph from '@component/Graph';
import { ReactFlowProvider } from 'reactflow';

const Workflow = (props) => {
  const transitions = props.transitions ? JSON.parse(props.transitions) : [];
  const isShowCycleEdge = props['showcycleedge']
    ? JSON.parse(props['showcycleedge'])
    : true;
  const mappingStatus = props['mappingstatus']
    ? JSON.parse(props['mappingstatus'])
    : [];
  const mappingEdge = props['mappingedge']
    ? JSON.parse(props['mappingedge'])
    : [];
  const isSelectable = props['isselectable']
    ? JSON.parse(props['isselectable'])
    : true;
  const isDraggable = props['isdraggable']
    ? JSON.parse(props['isdraggable'])
    : true;
  console.log(props);
  const onNodeClick = useCallback(() => {
    return props['onnodeclick'] ?? null;
  }, []);

  const onNodeDragStart = props['onnodedragstart']
    ? JSON.parse(props['onnodedragstart'])
    : null;
  const onNodeDragStop = props['onnodedragstop']
    ? JSON.parse(props['onnodedragstop'])
    : null;

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const getGraph = async () => {
    const { nodes, edges } = refineFlow(transitions);
    setNodes(nodes);
    setEdges(edges);
  };
  useEffect(() => {
    if (transitions.length > 0) getGraph();
  }, [transitions, isShowCycleEdge]);

  return (
    <div className="">
      <link
        rel="stylesheet"
        href="https://img.jkos.com.tw/reactflow/style/reactflow.css"
      />
      <ReactFlowProvider>
        <Graph
          nodes={nodes}
          edges={edges}
          isShowCycleEdge={isShowCycleEdge}
          isSelectable={isSelectable}
          isDraggable={isDraggable}
          onNodeClick={onNodeClick}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
        />
      </ReactFlowProvider>
    </div>
  );
};

Workflow.propTypes = {
  transitions: PropTypes.string.isRequired,
  showcycleedge: PropTypes.string,
  mappingstatus: PropTypes.array,
  mappingedge: PropTypes.array,
  isselectable: PropTypes.string,
  isdraggable: PropTypes.string,
  onnodeclick: PropTypes.func,
  onnodedragstart: PropTypes.func,
  onnodedragstop: PropTypes.func,
};

export default Workflow;
