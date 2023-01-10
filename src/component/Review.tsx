import getSign from '@src/utils/getSign';
import { refineFlow } from '@src/utils/refineflow';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Edge, Node } from 'reactflow';
import Graph from '@component/Graph';
import { dateFormat } from '@src/utils/dateFormat';
import { ReactFlowProvider } from 'reactflow';
import { reviewUserStatusMap } from '@src/constant';

const Review = (props) => {
  const ref = useRef(null);

  const isShowCycleEdge = props['showcycleedge']
    ? JSON.parse(props['showcycleedge'])
    : false;
  const mappingStatus = props['mappingstatus']
    ? JSON.parse(props['mappingstatus'])
    : [];
  const mappingEdge = props['mappingedge']
    ? JSON.parse(props['mappingedge'])
    : [];
  const isSelectable = props['isselectable']
    ? JSON.parse(props['isselectable'])
    : false;
  const isDraggable = props['isdraggable']
    ? JSON.parse(props['isdraggable'])
    : false;

  const reviewId = props.reviewid;
  const secretKey = props.secretkey;
  const token = props.token;

  const [currentWorkflow, setCurrentWorkflow] = useState<any>();
  const [reviewData, setReviewData] = useState<any>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getGraph = async () => {
    const { transitions = [] } = currentWorkflow || {};
    const { nodes, edges } = refineFlow(transitions, reviewData.status);
    setNodes(nodes);
    setEdges(edges);
  };
  useEffect(() => {
    const fetchReview = async () => {
      const checkcode = getSign({}, secretKey);
      const res = await fetch(
        `https://sit-smart-review.jkos.app/reviews/${reviewId}`,
        {
          headers: {
            token,
            checkcode,
          },
        },
      ).then((x) => x.json());
      if (!res && res.ResultObject.workflowId) return;
      setReviewData(res.ResultObject);

      const workflowRes = await fetch(
        `https://sit-smart-review.jkos.app/workflows/${res.ResultObject.workflowId}`,
        {
          headers: {
            token,
            checkcode,
          },
        },
      ).then((x) => x.json());
      if (!workflowRes && workflowRes.ResultObject) return;
      setCurrentWorkflow(workflowRes.ResultObject);
    };
    if (reviewId && secretKey && token) fetchReview();
  }, [reviewId, secretKey, token, isShowCycleEdge]);

  useEffect(() => {
    if (!currentWorkflow || !reviewData) return;
    getGraph();
  }, [currentWorkflow]);

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
  return (
    <div style={{ width: '100%' }}>
      <link
        rel="stylesheet"
        href="https://img.jkos.com.tw/reactflow/style/reactflow.css"
      />
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      ></link>
      <div className="flex">
        {reviewData && (
          <>
            <div className="grow w-full border-r-2 pr-2 border-gray-200">
              現在審核狀態：
              <span className="font-bold">{reviewData?.status}</span>
              {nodes.length && edges.length && (
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
              )}
              {!nodes.length || (!edges.length && <div>目前無 workflow</div>)}
            </div>
            <div className="flex-none w-1/4 flex flex-col divide-y divide-slate-700">
              {reviewData?.timelines?.length &&
                reviewData?.timelines?.map(
                  ({
                    id,
                    reviewUser,
                    statusFrom,
                    statusTo,
                    reviewUserStatus,
                    createdAt,
                  }) => {
                    return (
                      <div className="p-2 text-sm" key={id}>
                        {reviewUser.email.split('@')?.[0]} 在{' '}
                        {dateFormat(new Date(createdAt))}{' '}
                        {statusFrom === null && '發起審核申請'}
                        {statusFrom !== null &&
                          statusFrom === statusTo &&
                          `${reviewUserStatusMap[reviewUserStatus]}，並保持審核狀態 ${statusFrom}`}
                        {statusFrom !== null &&
                          statusFrom !== statusTo &&
                          `審核${reviewUserStatusMap[reviewUserStatus]}，並將審核狀態由 ${statusFrom} 改為 ${statusTo}`}
                      </div>
                    );
                  },
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Review.propTypes = {
  token: PropTypes.string.isRequired,
  secretkey: PropTypes.string.isRequired,
  reviewid: PropTypes.string.isRequired,
  showcycleedge: PropTypes.bool,
  mappingstatus: PropTypes.array,
  mappingedge: PropTypes.array,
  isselectable: PropTypes.bool,
  isdraggable: PropTypes.bool,
};

export default Review;
