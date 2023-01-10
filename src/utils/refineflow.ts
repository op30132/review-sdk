import { Edge, MarkerType, Node, Position } from 'reactflow';

type TransitionType = {
  from: string;
  [key: string]: any;
};
const getStatuses = (transitions = []) => {
  const statuses = [];
  transitions.forEach((trans) => {
    const { from, pass, fail } = trans;
    [from, pass?.status, fail?.status].forEach((status) => {
      if (!status || statuses.includes(status)) return;
      statuses.push(status);
    });
  });
  return statuses;
};
export const getHighLight = (status, highLight, transitions) => {
  if (status === null) return highLight;
  const hight = [...highLight];
  let currentTransition = transitions.filter(
    (el) => el.pass?.status === status || el.fail?.status === status,
  )?.[0];

  if (currentTransition) {
    hight.push(currentTransition.from);
    return getHighLight(currentTransition.from, hight, transitions);
  } else {
    return hight;
  }
};
const edgeStyleOpts = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  labelBgPadding: [7.5, 4],
  labelBgBorderRadius: 10,
  labelBgStyle: {
    fill: '#d9dae4',
    width: 18,
    height: 18,
  },
};

export const refineFlow = (
  transitions: TransitionType[],
  activeStatus?: string,
) => {
  const statusList = getStatuses(transitions);
  const pastStatus = activeStatus
    ? getHighLight(activeStatus, [], transitions)
    : [];
  const nodes = refineNodes(statusList, activeStatus, pastStatus);
  const edges = refineEdges(transitions);
  return { nodes, edges };
};

export const refineNodes = (
  statuses: string[],
  activeStatus: string = '',
  pastStatus: string[] = [],
): Node[] => {
  return statuses.map((s) => ({
    id: s,
    data: { label: s },
    position: { x: 0, y: 0 },
    style: {
      fontSize: 16,
      ...(pastStatus.includes(s) && { backgroundColor: '#8cc34a' }),
      ...(activeStatus === s && { backgroundColor: '#fde047' }),
      ...(s === 'ALL' && {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '50%',
        width: 46,
        height: 46,
      }),
    },
    labelStyle: { fontWeight: 700 },
  }));
};

export const refineEdges = (transitions: TransitionType[]): Edge[] => {
  return transitions.reduce((lines, current) => {
    if (current.from === null) return lines;
    const line = [current.pass, current.fail].filter((l) => l);
    const newLines = line.map((l) => ({
      id: `${current.from}-${l.status}`,
      source: current.from,
      target: l.status,
      type: 'smoothstep',
      ...edgeStyleOpts,
    }));
    return [...lines, ...newLines];
  }, []);
};
