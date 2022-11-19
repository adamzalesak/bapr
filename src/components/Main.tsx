import { useMemo } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Edge,
  MiniMap,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'react-flow-renderer';
import { useRecoilState } from 'recoil';
import { DataNode } from '../models/dataNode';
import { NodeType } from '../models/nodeTypes';
import { edgesState, nodesState } from '../store/atoms';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Modals } from './modals/Modals';
import { FilterNode } from './nodes/FilterNode';
import { FileNode } from './nodes/FileNode';
import { JoinNode } from './nodes/JoinNode';
import { SortNode } from './nodes/SortNode';
import { SliceNode } from './nodes/SliceNode';

export const Main = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);

  const nodeTypes = useMemo(
    () => ({
      [NodeType.File]: FileNode,
      [NodeType.Sort]: SortNode,
      [NodeType.Filter]: FilterNode,
      [NodeType.Join]: JoinNode,
      [NodeType.Slice]: SliceNode,
    }),
    [],
  );

  const handleNodesChange: OnNodesChange = (change) => {
    const updatedNodes = applyNodeChanges(change, nodes);
    setNodes(updatedNodes as DataNode[]);
  };

  const handleEdgesChange: OnEdgesChange = (change) => {
    const updatedEdges = applyEdgeChanges(change, edges);
    setEdges(updatedEdges);
  };

  const onConnect: OnConnect = (connection) => {
    // prevent connecting multiple input nodes
    if (edges.find((e) => e.targetHandle === connection.targetHandle)) {
      return;
    }

    if (connection.source === null || connection.target === null) {
      return;
    }

    const edge: Edge = {
      ...connection,
      id: `${connection.sourceHandle}-${connection.targetHandle}`,
      source: connection.source,
      target: connection.target,
      animated: true,
    };
    setEdges((eds) => addEdge(edge, eds));
  };

  return (
    <>
      <Modals />

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        deleteKeyCode={['Delete', 'Backspace']}
        fitView
      >
        <ControlPanel />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </>
  );
};
