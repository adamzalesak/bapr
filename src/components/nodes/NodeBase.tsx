import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useNode, useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { NodeState } from '../../models/node';
import { openModalState } from '../../store/atoms';

const NodeBox = styled.div`
  padding: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 3px;
  background-color: var(--primary-background);
`;

interface StateBadgeProps {
  state: NodeState;
}

const State = styled.div<StateBadgeProps>`
  height: 0rem;
  width: 0rem;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 2px;

  border-style: solid;
  border-width: 0 0 0.75rem 0.75rem;
  border-color: transparent transparent
    ${(props) =>
      props.state === NodeState.Done
        ? 'var(--node-state-color-green)'
        : props.state === NodeState.InvalidSettings
        ? 'var(--node-state-color-yellow)'
        : 'var(--node-state-color-red)'}
    transparent;
`;

interface BaseNodeProps {
  nodeId: string;
  nodeTypeName: string;
  children: ReactNode;
  state?: NodeState;
}

export const NodeBase = ({ nodeId, nodeTypeName, state, children }: BaseNodeProps) => {
  const sourceData = useSourceData(nodeId);
  const node = useNode(nodeId);
  const setOpenModal = useSetRecoilState(openModalState);

  const handleOpenDetail = () => {
    setOpenModal({ modalType: ModalType.Detail, nodeId });
  };

  const handleOpenPreview = () => {
    setOpenModal({ modalType: ModalType.Data, nodeId });
  };
  return (
    <NodeBox
      onClick={handleOpenDetail}
      onDoubleClickCapture={(event) => {
        event?.preventDefault();
        handleOpenPreview();
      }}
    >
      <div>{nodeTypeName.toUpperCase()}</div>
      <State
        state={
          state !== undefined
            ? state
            : node?.data
            ? NodeState.Done
            : sourceData
            ? NodeState.InvalidSettings
            : NodeState.NoSource
        }
      />
      {children}
    </NodeBox>
  );
};

