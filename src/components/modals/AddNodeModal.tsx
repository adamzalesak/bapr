import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  getInitialFileNode,
  getInitialFilterNode,
  getInitialJoinNode,
  getInitialSimpleImputerNode,
  getInitialSliceNode,
  getInitialSortNode,
} from '../../initialNodes';
import { DataNode } from '../../models/dataNode';
import { NodeType } from '../../models/nodeTypes';
import { nodeCountState, nodesState, openModalState } from '../../store/atoms';
import { Card } from '../common/Card';
import { Modal } from '../common/Modal';

const CardsWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;

export const AddNodeModal = () => {
  const { t } = useTranslation();

  const setOpenModal = useSetRecoilState(openModalState);
  const setNodes = useSetRecoilState(nodesState);
  const [nodeCount, setNodeCount] = useRecoilState(nodeCountState);

  const handleAddNode = (nodeType: NodeType) => {
    const nodeCountString = nodeCount.toString();

    let newNode: DataNode;
    switch (nodeType) {
      case NodeType.File: {
        newNode = getInitialFileNode(nodeCountString);
        break;
      }
      case NodeType.Sort: {
        newNode = getInitialSortNode(nodeCountString);
        break;
      }
      case NodeType.Filter: {
        newNode = getInitialFilterNode(nodeCountString);
        break;
      }
      case NodeType.Join: {
        newNode = getInitialJoinNode(nodeCountString);
        break;
      }
      case NodeType.Slice: {
        newNode = getInitialSliceNode(nodeCountString);
        break;
      }
      case NodeType.SimpleImputer: {
        newNode = getInitialSimpleImputerNode(nodeCountString);
        break;
      }
    }

    setNodes((nodes) => [...nodes, newNode]);
    setNodeCount((nodeCount) => nodeCount + 1);
    setOpenModal(null);
  };

  return (
    <Modal title={t('addNode.title')} open={true} onClose={() => setOpenModal(null)}>
      <CardsWrapper>
        <Card
          title={t('nodes.file.title')}
          description={t('nodes.file.description')}
          onClick={() => handleAddNode(NodeType.File)}
        />
        <Card
          title={t('nodes.sort.title')}
          description={t('nodes.sort.description')}
          onClick={() => handleAddNode(NodeType.Sort)}
        />
        <Card
          title={t('nodes.filter.title')}
          description={t('nodes.filter.description')}
          onClick={() => handleAddNode(NodeType.Filter)}
        />
        <Card
          title={t('nodes.join.title')}
          description={t('nodes.join.description')}
          onClick={() => handleAddNode(NodeType.Join)}
        />
        <Card
          title={t('nodes.slice.title')}
          description={t('nodes.slice.description')}
          onClick={() => handleAddNode(NodeType.Slice)}
        />
        <Card
          title={t('nodes.simpleImputer.title')}
          description={t('nodes.simpleImputer.description')}
          onClick={() => handleAddNode(NodeType.SimpleImputer)}
        />
      </CardsWrapper>
    </Modal>
  );
};
