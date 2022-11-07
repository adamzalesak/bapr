import { useMemo } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'react-flow-renderer';
import { useRecoilState } from 'recoil';
import { DataNode } from '../models/dataNode';
import { NodeType } from '../models/nodeTypes';
import { edgesState, nodesState } from '../store/atoms';
import { Modals } from './modals/Modals';
import { FilterNode } from './nodes/FilterNode';
import { InputFileNode } from './nodes/InputFileNode';
import { JoinNode } from './nodes/JoinNode';
import { SortNode } from './nodes/SortNode';

export const Main = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);

  const nodeTypes = useMemo(
    () => ({
      [NodeType.InputFile]: InputFileNode,
      [NodeType.Sort]: SortNode,
      [NodeType.Filter]: FilterNode,
      [NodeType.Join]: JoinNode,
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
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
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
        fitView
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </>
  );
};
