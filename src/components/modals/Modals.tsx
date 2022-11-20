import { useRecoilValue } from 'recoil';
import { useOpenModalNode } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { NodeType } from '../../models/nodeTypes';
import { openModalState } from '../../store/atoms';
import { AddNodeModal } from './AddNodeModal';
import { DataModal } from './DataModal';
import { FilterDetailModal } from './FilterDetailModal';
import { FileDetailModal } from './FileDetailModal';
import { JoinDetailModal } from './JoinDetailModal';
import { SortDetailModal } from './SortDetailModal';
import { SliceDetailModal } from './SliceDetailModal';
import { SimpleImputerDetailModal } from './SimpleImputerDetailModal';

export const Modals = () => {
  const openNode = useOpenModalNode();
  const openModal = useRecoilValue(openModalState);

  return (
    <>
      {openNode?.type === NodeType.File && <FileDetailModal />}
      {openNode?.type === NodeType.Sort && <SortDetailModal />}
      {openNode?.type === NodeType.Filter && <FilterDetailModal />}
      {openNode?.type === NodeType.Join && <JoinDetailModal />}
      {openNode?.type === NodeType.Slice && <SliceDetailModal />}
      {openNode?.type === NodeType.SimpleImputer && <SimpleImputerDetailModal />}

      {openModal?.modalType === ModalType.Add && <AddNodeModal />}

      <DataModal />
    </>
  );
};
