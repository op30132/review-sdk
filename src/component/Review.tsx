import getSign from '@src/utils/getSign';
import { getHighLight, refineEdges, refineNodes } from '@src/utils/refineflow';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import Graph from '@component/Graph';
import { dateFormat } from '@src/utils/dateFormat';

const Review = (props) => {
  const reviewId = props.reviewid;
  const secretKey = props.secretkey;
  const token = props.token;

  const [currentWorkflow, setCurrentWorkflow] = useState<any>();
  const [reviewData, setReviewData] = useState<any>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const getGraph = async () => {
    const { statuses = [], transitions = [] } = currentWorkflow || {};
    const activeStatus = getHighLight(reviewData.status, [], transitions);
    setNodes(refineNodes(statuses, activeStatus, reviewData.status));
    setEdges(refineEdges(transitions));
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
  }, []);

  useEffect(() => {
    if (!currentWorkflow || !reviewData) return;
    getGraph();
  }, [currentWorkflow]);
  const style = {};
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
        <div className="grow w-full border-r-2 border-gray-200">
          現在審核狀態：
          <span className="font-bold">{reviewData?.status}</span>
          <Graph nodes={nodes} edges={edges} />
        </div>
        <div className="flex-none w-1/4 flex flex-col divide-y divide-slate-700">
          {reviewData?.timelines?.length &&
            reviewData?.timelines?.map((el) => {
              return (
                <div className="p-2 text-sm" key={el.id}>
                  {el.reviewUser.email.split('@')?.[0]} 在{' '}
                  {dateFormat(new Date(el.createdAt))}{' '}
                  {el.statusFrom === null && '發起審核申請'}
                  {el.statusFrom !== null &&
                    el.statusFrom === el.statusTo &&
                    `將審核狀態 ${el.statusFrom} 至 ${el.statusTo}`}
                  {el.statusFrom !== null &&
                    el.statusFrom !== el.statusTo &&
                    `將審核狀態 ${el.statusFrom} 至 ${el.statusTo}`}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  token: PropTypes.string.isRequired,
  secretkey: PropTypes.string.isRequired,
  reviewid: PropTypes.string.isRequired,
  // TODO: click/drag
};

export default Review;
