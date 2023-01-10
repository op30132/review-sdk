import { refineFlow } from '@src/utils/refineflow';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Edge, Node } from 'reactflow';
import Graph from '@component/Graph';
import { ReactFlowProvider } from 'reactflow';

const Workflow = (props) => {
  const ref = useRef(null);
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

  const onNodeClick = useCallback((e) => {
    ref.current.dispatchEvent(
      new CustomEvent('onNodeClick', {
        composed: true,
        bubbles: true,
        detail: e,
      }),
    );
  }, []);
  const onNodeDragStart = useCallback((e) => {
    ref.current.dispatchEvent(
      new CustomEvent('onNodeDragStart', {
        composed: true,
        bubbles: true,
        detail: e,
      }),
    );
  }, []);
  const onNodeDragStop = useCallback((e) => {
    ref.current.dispatchEvent(
      new CustomEvent('onNodeDragStop', {
        composed: true,
        bubbles: true,
        detail: e,
      }),
    );
  }, []);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const getGraph = async () => {
    const { nodes, edges } = refineFlow(transitions);
    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    if (transitions.length > 0) getGraph();
  }, [props.transitions, props.isShowCycleEdge]);

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
          ref={ref}
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
};

export default Workflow;
