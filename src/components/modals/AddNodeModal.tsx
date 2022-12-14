import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useViewport } from 'reactflow';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useModal } from '../../hooks/modal';
import {
  getInitialDropColumnsNode,
  getInitialFileNode,
  getInitialFilterNode,
  getInitialJoinNode,
  getInitialMinMaxScalerNode,
  getInitialOneHotEncoderNode,
  getInitialRenameColumnsNode,
  getInitialSimpleImputerNode,
  getInitialSliceNode,
  getInitialSortNode,
  getInitialStandardScalerNode,
} from '../../initialNodes';
import { DataNode } from '../../models/dataNode';
import { NodeType } from '../../models/nodeTypes';
import { nodeCountState, nodesState } from '../../store/atoms';
import { Card } from '../common/Card';
import { Modal } from '../common/Modal';

const CardsContainer = styled('div')(
  ({ theme }) => `
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: ${theme.breakpoints.values.md}px) {
    grid-template-columns: 1fr 1fr;
  }
`,
);

export const AddNodeModal = () => {
  const { t } = useTranslation();

  const { closeModal } = useModal();
  const setNodes = useSetRecoilState(nodesState);
  const [nodeCount, setNodeCount] = useRecoilState(nodeCountState);

  const viewport = useViewport();

  const handleAddNode = (nodeType: NodeType) => {
    const id = nodeCount.toString();

    const viewportCenterPosition = {
      x: -viewport.x / viewport.zoom + window.innerWidth / viewport.zoom / 2,
      y: -viewport.y / viewport.zoom + window.innerHeight / viewport.zoom / 2,
    };

    let newNode: DataNode;
    switch (nodeType) {
      case NodeType.File: {
        newNode = getInitialFileNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.Sort: {
        newNode = getInitialSortNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.Filter: {
        newNode = getInitialFilterNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.Join: {
        newNode = getInitialJoinNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.Slice: {
        newNode = getInitialSliceNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.SimpleImputer: {
        newNode = getInitialSimpleImputerNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.MinMaxScaler: {
        newNode = getInitialMinMaxScalerNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.StandardScaler: {
        newNode = getInitialStandardScalerNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.OneHotEncoder: {
        newNode = getInitialOneHotEncoderNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.RenameColumns: {
        newNode = getInitialRenameColumnsNode(id, viewportCenterPosition);
        break;
      }
      case NodeType.DropColumns: {
        newNode = getInitialDropColumnsNode(id, viewportCenterPosition);
        break;
      }
    }

    setNodes((nodes) => [...nodes, newNode]);
    setNodeCount((nodeCount) => nodeCount + 1);
    closeModal();
  };

  return (
    <Modal title={t('addNode.title')} open onClose={closeModal}>
      <CardsContainer>
        <Card
          title={t('nodes.file.title')}
          description={t('nodes.file.description')}
          onClick={() => handleAddNode(NodeType.File)}
        />
        <Card
          title={t('nodes.slice.title')}
          description={t('nodes.slice.description')}
          onClick={() => handleAddNode(NodeType.Slice)}
        />
        <Card
          title={t('nodes.renameColumns.title')}
          description={t('nodes.renameColumns.description')}
          onClick={() => handleAddNode(NodeType.RenameColumns)}
        />
        <Card
          title={t('nodes.dropColumns.title')}
          description={t('nodes.dropColumns.description')}
          onClick={() => handleAddNode(NodeType.DropColumns)}
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
          title={t('nodes.simpleImputer.title')}
          description={t('nodes.simpleImputer.description')}
          onClick={() => handleAddNode(NodeType.SimpleImputer)}
        />
        <Card
          title={t('nodes.minMaxScaler.title')}
          description={t('nodes.minMaxScaler.description')}
          onClick={() => handleAddNode(NodeType.MinMaxScaler)}
        />
        <Card
          title={t('nodes.standardScaler.title')}
          description={t('nodes.standardScaler.description')}
          onClick={() => handleAddNode(NodeType.StandardScaler)}
        />
        <Card
          title={t('nodes.oneHotEncoder.title')}
          description={t('nodes.oneHotEncoder.description')}
          onClick={() => handleAddNode(NodeType.OneHotEncoder)}
        />
      </CardsContainer>
    </Modal>
  );
};
