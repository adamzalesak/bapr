import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNode, useSourceDataFrame } from '../../../hooks/node';
import { ModalType } from '../../../models/modal';
import { NodeState } from '../../../models/dataNode';
import { edgesState, nodesState, openModalState } from '../../../store/atoms';
import { NodeBox, StateLine, RowColumnCount } from './styled';
import { NodeBaseMenu } from './NodeBaseMenu';

interface BaseNodeProps {
  nodeId: string;
  nodeTypeName: string;
  children: ReactNode;
  state?: NodeState;
}

export const NodeBase = ({ nodeId, nodeTypeName, state, children }: BaseNodeProps) => {
  const node = useNode(nodeId);
  const sourceDataFrame = useSourceDataFrame(nodeId);
  const setOpenModal = useSetRecoilState(openModalState);
  const setNodes = useSetRecoilState(nodesState);
  const setEdges = useSetRecoilState(edgesState);

  const handleOpenDetail = () => {
    setOpenModal({ modalType: ModalType.Detail, nodeId });
  };

  const handleOpenDataPreview = () => {
    setOpenModal({ modalType: ModalType.Data, nodeId });
  };

  const handleSaveToFile = () => {
    sourceDataFrame?.toCSVFile();
  };

  const handleDeleteNode = () => {
    setNodes((nodes) => nodes.filter((n) => n.id !== nodeId));
    setEdges((edges) => edges.filter((e) => e.source !== nodeId && e.target !== nodeId));
  };

  const nodeState =
    state !== undefined
      ? state
      : node?.data.dataFrame
      ? NodeState.Done
      : sourceDataFrame
      ? NodeState.InvalidSettings
      : NodeState.NoSource;

  return (
    <>
      <NodeBox onDoubleClick={handleOpenDetail} selected={node?.selected}>
        <div>{nodeTypeName}</div>

        <NodeBaseMenu
          nodeState={nodeState}
          onOpenDetail={handleOpenDetail}
          onOpenDataPreview={handleOpenDataPreview}
          onSaveToFile={handleSaveToFile}
          onDeleteNode={handleDeleteNode}
        />

        <StateLine state={nodeState} />
        {children}
      </NodeBox>

      {node?.data.dataFrame ? (
        <RowColumnCount>
          {node?.data.dataFrame?.count} rows | {node?.data.dataFrame?.columns?.length} columns
        </RowColumnCount>
      ) : null}
    </>
  );
};
