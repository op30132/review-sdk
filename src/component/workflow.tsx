import getSign from '@src/utils/getSign';
import { refineEdges, refineNodes } from '@src/utils/refineflow';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import Graph from '@component/Graph';

const Workflow = (props) => {
  const transitions = JSON.parse(props.transitions);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getStatuses = (transitions = []) => {
    const statuses = [];
    transitions.forEach((trans) => {
      const { from, pass, fail } = trans;
      [from, pass?.status, fail?.status].forEach((status) => {
        if (!status || status === 'ALL' || statuses.includes(status)) return;
        statuses.push(status);
      });
    });
    return statuses;
  };

  const getGraph = async () => {
    const statuses = getStatuses(transitions);
    setNodes(refineNodes(statuses));
    setEdges(refineEdges(transitions));
  };
  useEffect(() => {
    if (transitions.length > 0) getGraph();
  }, []);

  return (
    <div className="">
      <link
        rel="stylesheet"
        href="https://img.jkos.com.tw/reactflow/style/reactflow.css"
      />
      <Graph nodes={nodes} edges={edges} />
    </div>
  );
};

Workflow.propTypes = {
  transitions: PropTypes.string.isRequired,
};

export default Workflow;
