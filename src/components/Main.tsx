import { useMemo } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from 'reactflow';
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

import 'reactflow/dist/style.css';
import { SimpleImputerNode } from './nodes/SimpleImputerNode';
import { StandardScalerNode } from './nodes/StandardScalerNode';
import { MinMaxScalerNode } from './nodes/MinMaxScalerNode';
import { OneHotEncoderNode } from './nodes/OneHotEncoderNode';
import { RenameColumnsNode } from './nodes/RenameColumnsNode';
import { useTheme } from '@mui/material';
import { DropColumnsNode } from './nodes/DropColumnsNode';

export const Main = () => {
  const theme = useTheme();
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);

  const nodeTypes = useMemo(() => {
    return {
      [NodeType.File]: FileNode,
      [NodeType.Sort]: SortNode,
      [NodeType.Filter]: FilterNode,
      [NodeType.Join]: JoinNode,
      [NodeType.Slice]: SliceNode,
      [NodeType.SimpleImputer]: SimpleImputerNode,
      [NodeType.MinMaxScaler]: MinMaxScalerNode,
      [NodeType.StandardScaler]: StandardScalerNode,
      [NodeType.OneHotEncoder]: OneHotEncoderNode,
      [NodeType.RenameColumns]: RenameColumnsNode,
      [NodeType.DropColumns]: DropColumnsNode,
    };
  }, []);

  const handleNodesChange: OnNodesChange = (change) => {
    const updatedNodes = applyNodeChanges(change, nodes);
    setNodes(updatedNodes as DataNode[]);
  };

  const handleEdgesChange: OnEdgesChange = (change) => {
    const updatedEdges = applyEdgeChanges(change, edges);
    setEdges(updatedEdges);
  };

  const onConnect: OnConnect = (connection) => {
    setEdges((eds) =>
      addEdge(
        { ...connection, animated: true },
        eds.filter(
          // prevent connecting multiple input nodes
          (e) => e.target !== connection.target || e.targetHandle !== connection.targetHandle,
        ),
      ),
    );
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
        <Background variant={BackgroundVariant.Dots} color={theme.palette.primary.light} />
      </ReactFlow>
    </>
  );
};
