import { Edge, MarkerType, Node } from 'reactflow';

type TransitionType = {
  from: string;
  [key: string]: any;
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

export const refineNodes = (
  statuses: string[],
  pastStatus: string[] = [],
  activeStatus: string = '',
): Node[] => {
  return statuses.map((s) => ({
    id: s,
    data: { label: s },
    position: { x: 0, y: 0 },
    style: {
      fontSize: 16,
      ...(pastStatus.includes(s) && { backgroundColor: '#8cc34a' }),
      ...(activeStatus === s && { backgroundColor: '#fde047' }),
    },
    labelStyle: { fontWeight: 700 },
  }));
};
const edgeStyleOpts = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 16,
    height: 16,
  },
  labelBgPadding: [7.5, 4],
  labelBgBorderRadius: 10,
  labelBgStyle: {
    fill: '#d9dae4',
    width: 18,
    height: 18,
  },
};

export const refineEdges = (transitions: TransitionType[]): Edge[] => {
  return transitions.reduce((lines, current) => {
    const line = [current.pass, current.fail];
    const newLines = line
      .filter((l) => l)
      .map((l) => ({
        id: `${current.from}-${l.status}`,
        source: current.from,
        target: l.status,
        // animated: true,
        type: 'smoothstep',
        ...edgeStyleOpts,
      }));
    return [...lines, ...newLines];
  }, []);
};
