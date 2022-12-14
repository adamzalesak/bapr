import { useTheme } from '@mui/material';
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
  OnNodesChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRecoilState } from 'recoil';
import { DataNode } from '../models/dataNode';
import { NodeType } from '../models/nodeTypes';
import { edgesState, nodesState } from '../store/atoms';
import { ControlPanel } from './ControlPanel/ControlPanel';
import { Modals } from './modals/Modals';
import { DropColumnsNode } from './nodes/DropColumnsNode';
import { FileNode } from './nodes/FileNode';
import { FilterNode } from './nodes/FilterNode';
import { JoinNode } from './nodes/JoinNode';
import { MinMaxScalerNode } from './nodes/MinMaxScalerNode';
import { OneHotEncoderNode } from './nodes/OneHotEncoderNode';
import { RenameColumnsNode } from './nodes/RenameColumnsNode';
import { SimpleImputerNode } from './nodes/SimpleImputerNode';
import { SliceNode } from './nodes/SliceNode';
import { SortNode } from './nodes/SortNode';
import { StandardScalerNode } from './nodes/StandardScalerNode';

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
    setEdges((eds) => {
      // prevent loop creation (the graph must be a tree)
      const sourceNode = nodes.find((n) => n.id === connection.source);
      let node = sourceNode;
      while (node) {
        if (node.id === connection.target) {
          return eds;
        }
        const predecessorId = edges.find((e) => e.target === node?.id)?.source;
        node = nodes.find((n) => n.id === predecessorId);
      }

      return addEdge(
        { ...connection, animated: true },
        eds.filter(
          // prevent connecting multiple input nodes
          (e) => e.target !== connection.target || e.targetHandle !== connection.targetHandle,
        ),
      );
    });
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
