import { useModal } from '../../hooks/modal';
import { ModalType } from '../../models/modal';
import { NodeType } from '../../models/nodeTypes';
import { AddNodeModal } from './AddNodeModal';
import { DataModal } from './DataModal';
import { DropColumnsDetailModal } from './DropColumnsDetailModal';
import { FileDetailModal } from './FileDetailModal';
import { FilterDetailModal } from './FilterDetailModal';
import { JoinDetailModal } from './JoinDetailModal';
import { MinMaxScalerDetailModal } from './MinMaxScalerDetailModal';
import { OneHotEncoderDetailModal } from './OneHotEncoderDetailModal';
import { RenameColumnsDetailModal } from './RenameColumnsDetailModal';
import { SimpleImputerDetailModal } from './SimpleImputerDetailModal';
import { SliceDetailModal } from './SliceDetailModal';
import { SortDetailModal } from './SortDetailModal';
import { StandardScalerDetailModal } from './StandardScalerDetailModal';

export const Modals = () => {
  const { node, openModalType } = useModal();

  return (
    <>
      {openModalType === ModalType.Detail && (
        <>
          {node?.type === NodeType.File && <FileDetailModal />}
          {node?.type === NodeType.Sort && <SortDetailModal />}
          {node?.type === NodeType.Filter && <FilterDetailModal />}
          {node?.type === NodeType.Join && <JoinDetailModal />}
          {node?.type === NodeType.Slice && <SliceDetailModal />}
          {node?.type === NodeType.SimpleImputer && <SimpleImputerDetailModal />}
          {node?.type === NodeType.MinMaxScaler && <MinMaxScalerDetailModal />}
          {node?.type === NodeType.StandardScaler && <StandardScalerDetailModal />}
          {node?.type === NodeType.OneHotEncoder && <OneHotEncoderDetailModal />}
          {node?.type === NodeType.RenameColumns && <RenameColumnsDetailModal />}
          {node?.type === NodeType.DropColumns && <DropColumnsDetailModal />}
        </>
      )}
      {openModalType === ModalType.Add && <AddNodeModal />}
      {openModalType === ModalType.Data && <DataModal />}
    </>
  );
};
